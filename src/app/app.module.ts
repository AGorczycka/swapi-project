import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './features/layout/layout.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { CardContainerComponent } from './features/card-container/card-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PageNotFoundComponent,
    CardContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
