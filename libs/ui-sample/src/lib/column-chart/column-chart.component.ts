import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_3d from 'highcharts/highcharts-3d';

HC_3d(Highcharts);

@Component({
  selector: 'abc-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 25,
        beta: 0,
      },
    },
    title: {
      text: 'Browser market shares at a specific website, 2014',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 15,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
          // style: {
          //   color:
          //     (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
          //     'black',
          // },
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Browser share',
        data: [
          ['Firefox', 45.0],
          ['IE', 26.8],
          {
            name: 'Chrome',
            y: 12.8,
            sliced: true,
            selected: true,
          },
          ['Safari', 8.5],
          ['Opera', 6.2],
          ['Others', 0.7],
        ],
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
