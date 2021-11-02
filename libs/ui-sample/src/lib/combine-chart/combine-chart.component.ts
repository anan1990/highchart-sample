import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'abc-combine-chart',
  templateUrl: './combine-chart.component.html',
  styleUrls: ['./combine-chart.component.scss'],
})
export class CombineChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    plotOptions: {
      pie: {
        dataLabels: {
          // align: 'right',
          color: 'red',
          shadow: false,
          // x: -10,
          enabled: true,
          // inside:true,
          // formatter: labelFormatterFunction,
          connectorWidth: 10,
        },
      },
    },

    series: [
      {
        type: 'column',
        name: 'Jane',
        data: [3, 2, 1, 3, 4],
      },
      {
        type: 'column',
        name: 'John',
        data: [2, 3, 5, 7, 6],
      },
      {
        type: 'column',
        name: 'Joe',
        data: [4, 3, 3, 9, 0],
      },
      {
        type: 'spline',
        name: 'Average',
        data: [3, 2.67, 3, 6.33, 3.33],
      },
      {
        type: 'pie',
        name: 'Total consumption',
        data: [
          {
            name: 'Chrome',
            y: 61.41,
            /* sliced: true,
          selected: true */
          },
          {
            name: 'Internet Explorer',
            y: 11.84,
          },
          {
            name: 'Firefox',
            y: 10.85,
          },
          {
            name: 'Edge',
            y: 4.67,
          },
          {
            name: 'Safari',
            y: 4.18,
          },
          {
            name: 'Sogou Explorer',
            y: 1.64,
          },
          {
            name: 'Opera',
            y: 1.6,
          },
          {
            name: 'QQ',
            y: 1.2,
          },
          {
            name: 'Other',
            y: 2.61,
          },
        ],
        center: [80, 30],
        size: 100,
        showInLegend: false,
        dataLabels: {
          enabled: false,
        },
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
