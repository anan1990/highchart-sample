import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradingVolumeComponent } from './trading-volume/trading-volume.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { LiquidityService } from './service/liquidity.service';
import { WebsocketService } from './service/socketio.service';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {path : '', component : TradingVolumeComponent},
];
@NgModule({
  imports: [CommonModule, HighchartsChartModule, RouterModule.forChild(routes)],
  declarations: [TradingVolumeComponent],
  providers:[LiquidityService, WebsocketService],
  exports: [],
})
export class VniLiquidityModule {}
