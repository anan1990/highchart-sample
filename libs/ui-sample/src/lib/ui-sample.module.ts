import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LineChartComponent } from './line-chart/line-chart.component';
import { UiSampleComponent } from './ui-sample/ui-sample.component';
import { HighchartsChartModule } from 'highcharts-angular';

export const uiSampleRoutes: Route[] = [
  {
    path: '',
    component: UiSampleComponent,
  },
  {
    path: 'line-chart',
    component: LineChartComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(uiSampleRoutes),
    HighchartsChartModule,
  ],
  declarations: [LineChartComponent, UiSampleComponent],
})
export class UiSampleModule {}
