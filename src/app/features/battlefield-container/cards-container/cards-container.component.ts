import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { ResourceEnum } from 'src/app/enums/resource.enum';
import { IApiDataPage } from 'src/app/models/IApiDataPage';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { BattlefieldContainerService } from '../battlefield-container.service';

@Component({
  selector: 'swapi-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsContainerComponent implements OnInit, OnDestroy {
  
  @Output() areCardsLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  isLoaded = false;
  areBothCardsLoaded = false;
  battleResult: string | null = null;
  cardIds: Array<number | null> = [];
  dataSource: ResourceEnum | null = null;
  players: Array<{ index: number, wins: number }> = [ { index: 0, wins: 0 }, { index: 1, wins: 0 } ];
  
  private dataCount: number | null = null;
  private playerValues: Array<{ index: number, numericValue: number }> = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private battlefieldContainerService: BattlefieldContainerService, 
    private changeDetection: ChangeDetectorRef, 
    private errorHandlingService: ErrorHandlingService
  ) { }

  ngOnInit(): void {
    this.getResource();
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
    this.areBothCardsLoaded = false;
    this.battleResult = 'Insufficient data. Please, try again.';
    this.areCardsLoaded.emit(this.isLoaded);
    
    const cardsSubscription = this.battlefieldContainerService.getDataCount(this.dataSource)
    .pipe(
      retry(1),
      tap(() => {
        this.cardIds = [],
        this.playerValues = []
      })
    )
    .subscribe({
      next: (result: IApiDataPage) => {
        this.dataCount = result.count;
        this.generateNumber();
      },
      error: (err: HttpErrorResponse) => (this.errorHandlingService.handleError(err)),
      complete: () => {
        this.isLoaded = true;
        this.areCardsLoaded.emit(this.isLoaded);
        this.changeDetection.detectChanges();
      }
    });

    this.subscription.add(cardsSubscription);
  }

  getPlayerWins(playerId: number): string {
    const playerWins = this.players[playerId].wins;
    return `Player ${playerId} won: ${playerWins} ${playerWins === 1 ? 'time' : 'times'}.`
  }

  isCardLoaded(isLoaded: boolean): boolean {
    this.areBothCardsLoaded = isLoaded;
    return isLoaded;
  }

  trackByIndex(index: number, item: number): number {
    return index; 
  }

  private comparePlayerValues(): void {
    const player0 = this.players.find(player => player.index === 0).index;
    const player1 = this.players.find(player => player.index === 1).index;

    if (this.playerValues[player0].numericValue < this.playerValues[player1].numericValue) {
      this.setWinner(player1);
    } else if (this.playerValues[player0].numericValue > this.playerValues[player1].numericValue) {
      this.setWinner(player0);
    } else if (this.playerValues[player0].numericValue === this.playerValues[player1].numericValue) {
      this.battleResult = `It's a tie.`;
    } else {
      this.battleResult = 'Insufficient data. Please, try again.';
    }
  }

  private generateNumber(): void {
    const numberOfPlayers = 2;
    for (var i = 0; i < numberOfPlayers; i++) this.cardIds.push(Math.floor(Math.random() * this.dataCount) + 1);
  }

  private getResource(): void {
    const resourceSubscription = this.battlefieldContainerService.resourceSubject
      .subscribe({
        next: (resource: ResourceEnum) => {
          this.dataSource = resource; 
          this.getData();
          this.changeDetection.detectChanges();
        }
      });

    this.subscription.add(resourceSubscription); 
  }

  private setWinner(winnerIndex: number): void {
    this.battleResult = `Player ${this.playerValues[winnerIndex].index} wins!`;
    this.players.find(player => player.index === this.playerValues[winnerIndex].index).wins++;
  }

}
