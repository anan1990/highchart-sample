import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradingVolumeComponent } from './trading-volume/trading-volume.component';
import { TradingRoutingModule } from './trading-volume/vni-liquidity-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { LiquidityService } from './service/liquidity.service';
import { WebsocketService } from './service/socketio.service';

@NgModule({
  imports: [CommonModule, TradingRoutingModule, HighchartsChartModule],
  declarations: [TradingVolumeComponent],
  providers:[LiquidityService, WebsocketService],
  exports: [],
})
export class VniLiquidityModule {}
