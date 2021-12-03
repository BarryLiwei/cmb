import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerosComponent } from './heros.component'

const routes: Routes = [
  { path: '', component: HerosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HerosRoutingModule { }
