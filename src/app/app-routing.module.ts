import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardContainerComponent } from './features/card-container/card-container.component';
import { LayoutComponent } from './features/layout/layout.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CardContainerComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  
}