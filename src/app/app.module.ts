import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './features/layout/layout.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { CardContainerComponent } from './features/card-container/card-container.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { CardsContainerComponent } from './features/cards-container/cards-container.component';
import { BattlefieldContainerComponent } from './features/battlefield-container/battlefield-container.component';

//separate to modules

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PageNotFoundComponent,
    CardContainerComponent,
    CardsContainerComponent,
    BattlefieldContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
