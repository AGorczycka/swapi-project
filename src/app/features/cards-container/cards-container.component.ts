import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { CardService } from '../card-container/card.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataSource: string | null = 'people'; // to service!!

  isLoaded = true;
  battleResult: string | null = null;
  cardIds: any = [];
  players: Array<{ index: number, wins: number }> = [ { index: 0, wins: 0 }, { index: 1, wins: 0 } ];
  
  private dataCount: number | null = null;
  private playerValues: Array<{ index: number, numericValue: number }> = [];
  private subscription: Subscription = new Subscription();

  constructor(private cardService: CardService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addComparableValue(index: number, value: string): void {
    const numericValue = parseFloat(value.replace(',', ''));
    this.playerValues.push({ index, numericValue });

    if (this.playerValues.length === this.cardIds.length) {
      this.comparePlayerValues();
    }

    this.changeDetection.detectChanges();
  }

  getData(): void {
    this.isLoaded = false;

    const sub = this.cardService.getDataCount(this.dataSource)
    .pipe(
      retry(1),
      tap(() => {
        this.cardIds = [],
        this.playerValues = []
      })
    )
    .subscribe({
      next: (result: any) => {
        this.dataCount = result.count;
        this.generateNumber();
      },
      error: (err: HttpErrorResponse) => (this.cardService.handleError(err)),
      complete: () => {
        this.isLoaded = true;
        this.changeDetection.detectChanges();
      }
    });

    this.subscription.add(sub);
  }

  trackByIndex(index: number, item: number): number {
    return index; 
  }

  private comparePlayerValues() {
    if (this.playerValues[0].numericValue < this.playerValues[1].numericValue) {
      this.setWinner(1);
    } else if (this.playerValues[0].numericValue > this.playerValues[1].numericValue) {
      this.setWinner(0);
    } else if (this.playerValues[0].numericValue === this.playerValues[1].numericValue) {
      this.battleResult = `It's a tie`;
    } else {
      this.battleResult = 'Insufficient data. Please, try again.';
    }
  }

  private generateNumber(): void {
    for (var i = 0; i < 2; i++) this.cardIds.push(Math.floor(Math.random() * this.dataCount) + 1);
  }

  private setWinner(winnerIndex: number): void {
    this.battleResult = `Player ${this.playerValues[winnerIndex].index} wins!`;
    this.players.find(player => player.index === this.playerValues[winnerIndex].index).wins++;
  }

}
