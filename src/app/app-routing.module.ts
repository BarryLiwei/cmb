import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'fund' , loadChildren: () => import('./pages/fund/fund.module').then(m => m.FundModule)},
  { path: 'business' , loadChildren: () => import('./pages/business/business.module').then(m => m.BusinessModule)},
  { path: 'track' , loadChildren: () => import('./pages/track/track.module').then(m => m.TrackModule)},
  { path: 'panel' , loadChildren: () => import('./pages/panel/panel.module').then(m => m.PanelModule)},
  { path: 'heros' , loadChildren: () => import('./pages/heros/heros.module').then(m => m.HerosModule)},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
