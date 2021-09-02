import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BattlefieldContainerComponent } from './features/battlefield-container/battlefield-container.component';
import { LayoutComponent } from './features/layout/layout.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/battlefield-container/battlefield-container.module').then(
            module => module.BattlefieldContainerModule
          )
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