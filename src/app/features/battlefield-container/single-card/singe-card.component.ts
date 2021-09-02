import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize, map, retry } from 'rxjs/operators';
import { ResourceEnum } from 'src/app/enums/resource.enum';
import { IPerson } from 'src/app/models/IPerson';
import { IPlanet } from 'src/app/models/IPlanet';
import { IResult } from 'src/app/models/IResult';
import { ISpecies } from 'src/app/models/ISpecies';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { BattlefieldContainerService } from '../battlefield-container.service';

type ApiData = IPerson | IPlanet | ISpecies;

@Component({
  selector: 'swapi-single-card',
  templateUrl: './singe-card.component.html',
  styleUrls: ['./singe-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCardComponent implements OnInit, OnDestroy {
  @Input() cardId: number | null = null;
  @Input() cardTitle: string | null = null;
  @Input() dataSource: ResourceEnum | null = null;
  
  @Output() commonValueToCompare: EventEmitter<string> = new EventEmitter<string>();
  
  cardData: IResult | null = null;
  isLoaded = true;
  
  private subscription: Subscription = new Subscription();

  constructor(
    private battlefieldContainerService: BattlefieldContainerService, 
    private changeDetection: ChangeDetectorRef, 
    private errorHandlingService: ErrorHandlingService
  ) { }

  ngOnInit(): void {
    this.getCardData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getCardData(): void {
    this.isLoaded = false;
    
    const cardSubscription = this.battlefieldContainerService.getData(this.dataSource, this.cardId)
      .pipe(
        retry(1),
        map((data: ApiData) => this.getSufficientData(data)),
        finalize(() => { 
          this.isLoaded = true; 
          this.changeDetection.detectChanges() 
        })
      )
      .subscribe({
        next: (result: IResult) => {
          this.cardData = result; 
          this.commonValueToCompare.emit(result.comparableValue); 
        },
        error: (err: HttpErrorResponse) => (this.errorHandlingService.handleError(err)),
        complete: () => (this.changeDetection.detectChanges())
      });

    this.subscription.add(cardSubscription); 
  }

  //CHANGE
  private getSufficientData(data: any): IResult { // move mapper outside?
    if (this.dataSource === ResourceEnum.PEOPLE) {
      return { name: data.name, comparableValue: data.mass }
    } else if (this.dataSource === ResourceEnum.PLANETS) {
      return { name: data.name, comparableValue: data.population }
    } else if (this.dataSource === ResourceEnum.SPECIES) {
      return { name: data.name, comparableValue: data.average_lifespan }
    }
  }

}