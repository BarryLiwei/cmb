import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HerosRoutingModule } from './heros-routing.module';
import { HerosComponent } from './heros.component';


@NgModule({
  declarations: [HerosComponent],
  imports: [
    CommonModule,
    HerosRoutingModule
  ]
})
export class HerosModule { }
