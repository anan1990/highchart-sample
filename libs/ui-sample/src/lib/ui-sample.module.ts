import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { UiSample1Component } from './ui-sample1/ui-sample1.component';
import { UiSampleComponent } from './ui-sample/ui-sample.component';
import { HighchartsChartModule } from 'highcharts-angular';

export const uiSampleRoutes: Route[] = [
  {
    path:'',
    component: UiSampleComponent
  },
  {
    path:'sample1',
    component: UiSample1Component
  }
];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(uiSampleRoutes), HighchartsChartModule],
  declarations: [
    UiSample1Component,
    UiSampleComponent
  ],
})
export class UiSampleModule {}
