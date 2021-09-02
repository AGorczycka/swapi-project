import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { BattlefieldContainerComponent } from './battlefield-container.component';
import { SingleCardComponent } from './single-card/singe-card.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BattlefieldContainerRoutingModule } from './battlefield-container-routing.module';

@NgModule({
  declarations: [
    BattlefieldContainerComponent,
    SingleCardComponent,
    CardsContainerComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BattlefieldContainerRoutingModule
  ]
})
export class BattlefieldContainerModule { }
