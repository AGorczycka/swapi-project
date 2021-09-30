import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './features/layout/layout.component';

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
        redirectTo: '/'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
