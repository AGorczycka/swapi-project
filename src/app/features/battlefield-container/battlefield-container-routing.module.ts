import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BattlefieldContainerComponent } from './battlefield-container.component';

const routes: Routes = [
  {
    path: '',
    component: BattlefieldContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BattlefieldContainerRoutingModule { }
