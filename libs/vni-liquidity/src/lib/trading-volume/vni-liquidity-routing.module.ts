import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingVolumeComponent } from './trading-volume.component';
const routes: Routes = [
  {path : '', component : TradingVolumeComponent},
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingRoutingModule { }