import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from './card.service';
import { finalize, map, retry } from 'rxjs/operators';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardContainerComponent implements OnInit, OnDestroy {
  @Input() dataSource: any | null = null; //add model
  @Input() cardId: number | null = null;
  @Input() cardTitle: string | null = null;

  @Output() commonValueToCompare: EventEmitter<string> = new EventEmitter<string>();

  cardData: any | null = null; //add model
  isLoaded = true;

  private subscription: Subscription = new Subscription();

  constructor(private cardService: CardService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCardData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getCardData(): void {
    this.isLoaded = false;

    const cardSubscription = this.cardService.getData(this.dataSource, this.cardId)
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
        error: (err: HttpErrorResponse) => (this.cardService.handleError(err)),
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