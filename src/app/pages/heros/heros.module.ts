import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { HerosRoutingModule } from './heros-routing.module';
import { HerosComponent } from './heros.component';


@NgModule({
  declarations: [HerosComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    HerosRoutingModule
  ]
})
export class HerosModule { }
