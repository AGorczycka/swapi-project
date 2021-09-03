import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattlefieldContainerComponent } from './battlefield-container.component';
import { SingleCardComponent } from './single-card/singe-card.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { BattlefieldContainerRoutingModule } from './battlefield-container-routing.module';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BattlefieldContainerComponent,
    CardsContainerComponent,
    SingleCardComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    BattlefieldContainerRoutingModule
  ]
})
export class BattlefieldContainerModule { }
