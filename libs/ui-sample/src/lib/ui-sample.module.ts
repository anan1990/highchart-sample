import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LineChartComponent } from './line-chart/line-chart.component';
import { UiSampleComponent } from './ui-sample/ui-sample.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AreaRangeComponent } from './area-range/area-range.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

export const uiSampleRoutes: Route[] = [
  {
    path: '',
    component: UiSampleComponent,
  },
  {
    path: 'line-chart',
    component: LineChartComponent,
  },
  {
    path:'area-chart',
    component: AreaRangeComponent
  },
  {
    path:'bar-chart',
    component: BarChartComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(uiSampleRoutes),
    HighchartsChartModule,
  ],
  declarations: [LineChartComponent, UiSampleComponent, AreaRangeComponent, BarChartComponent],
})
export class UiSampleModule {}
