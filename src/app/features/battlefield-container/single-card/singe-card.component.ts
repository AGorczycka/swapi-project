import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize, map, retry } from 'rxjs/operators';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { BattlefieldContainerService } from '../battlefield-container.service';

@Component({
  selector: 'swapi-single-card',
  templateUrl: './singe-card.component.html',
  styleUrls: ['./singe-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCardComponent implements OnInit, OnDestroy {
  @Input() dataSource: any | null = null; //add model
  @Input() cardId: number | null = null;
  @Input() cardTitle: string | null = null;

  @Output() commonValueToCompare: EventEmitter<string> = new EventEmitter<string>();

  cardData: any | null = null; //add model
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
        map((data: any) => this.getSufficientData(data)),
        finalize(() => { 
          this.isLoaded = true; 
          this.changeDetection.detectChanges() 
        })
      )
      .subscribe({
        next: (result: any) => { //add model
          this.cardData = result; 
          this.commonValueToCompare.emit(result.comparableValue); 
        },
        error: (err: HttpErrorResponse) => (this.errorHandlingService.handleError(err)),
        complete: () => (this.changeDetection.detectChanges())
      });

    this.subscription.add(cardSubscription); 
  }

  private getSufficientData(data: any): { name: string, comparableValue: string } { // move mapper outside?
    if (this.dataSource === 'people') { // remove magic strings here
      return { name: data.name, comparableValue: data.mass }
    } else if (this.dataSource === 'planets') {
      return { name: data.name, comparableValue: data.population }
    } else if (this.dataSource === 'species') {
      return { name: data.name, comparableValue: data.average_lifespan }
    }
  }

}