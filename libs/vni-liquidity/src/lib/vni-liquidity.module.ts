import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradingVolumeComponent } from './trading-volume/trading-volume.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TradingVolumeComponent
  ],
  exports: [
    TradingVolumeComponent
  ],
})
export class VniLiquidityModule {}
