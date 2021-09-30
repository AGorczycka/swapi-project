import { HttpErrorResponse } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { finalize, map, retry } from "rxjs/operators";
import { COMPARABLE_VALUES } from "src/app/data/dictionary-comparable-values";
import { ResourceEnum } from "src/app/enums/resource.enum";
import { ValuesEnum } from "src/app/enums/values.enum";
import { IPerson } from "src/app/models/IPerson";
import { IPlanet } from "src/app/models/IPlanet";
import { IResult } from "src/app/models/IResult";
import { ISpecies } from "src/app/models/ISpecies";
import { ErrorHandlingService } from "src/app/services/error-handling.service";
import { BattlefieldContainerService } from "../battlefield-container.service";

type ApiData = IPerson & IPlanet & ISpecies;

@Component({
  selector: "swapi-single-card",
  templateUrl: "./singe-card.component.html",
  styleUrls: ["./singe-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCardComponent implements OnInit, OnDestroy {
  @Input() cardId: number | null = null;
  @Input() cardTitle: string | null = null;

  @Output() private commonValueToCompare: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() private isCardLoaded: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  cardData: IResult | null = null;
  isLoaded = false;
  ValuesEnum = ValuesEnum;

  private dataSource: ResourceEnum | null = null;
  private subscription: Subscription = new Subscription();

  get dataSourceComparableValue(): string {
    return COMPARABLE_VALUES.find((value) => value.name === this.dataSource)
      .value;
  }

  constructor(
    private battlefieldContainerService: BattlefieldContainerService,
    private changeDetection: ChangeDetectorRef,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.getResource();
    this.getCardData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getCardData(): void {
    this.isLoaded = false;
    this.isCardLoaded.emit(this.isLoaded);

    const cardSubscription = this.battlefieldContainerService
      .getData(this.dataSource, this.cardId)
      .pipe(
        retry(1),
        map((data: ApiData) => this.getSufficientData(data)),
        finalize(() => {
          this.isLoaded = true;
          this.isCardLoaded.emit(this.isLoaded);
          this.changeDetection.detectChanges();
        })
      )
      .subscribe({
        next: (result: IResult) => {
          this.cardData = result;
          this.commonValueToCompare.emit(result.comparableValue);
        },
        error: (err: HttpErrorResponse) =>
          this.errorHandlingService.handleError(err),
        complete: () => this.changeDetection.detectChanges(),
      });

    this.subscription.add(cardSubscription);
  }

  private getResource(): void {
    const resourceSubscription =
      this.battlefieldContainerService.resourceSubject.subscribe({
        next: (resource: ResourceEnum) => {
          this.dataSource = resource;
          this.changeDetection.detectChanges();
        },
      });

    this.subscription.add(resourceSubscription);
  }

  private getSufficientData(data: ApiData): IResult {
    return {
      name: data.name,
      comparableValue: data[this.dataSourceComparableValue],
    };
  }
}
