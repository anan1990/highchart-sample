import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LineChartComponent } from './line-chart/line-chart.component';
import { UiSampleComponent } from './ui-sample/ui-sample.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AreaRangeComponent } from './area-range/area-range.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { CombineChartComponent } from './combine-chart/combine-chart.component';

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
  },
  {
    path:'column-chart',
    component: ColumnChartComponent
  },
  {
    path:'combine-chart',
    component: CombineChartComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(uiSampleRoutes),
    HighchartsChartModule,
  ],
  declarations: [LineChartComponent, UiSampleComponent, AreaRangeComponent, BarChartComponent, ColumnChartComponent, CombineChartComponent],
})
export class UiSampleModule {}
