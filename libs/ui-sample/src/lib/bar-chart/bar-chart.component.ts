import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'abc-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: {
        // linearGradient: [0, 0, 500, 500],
        linearGradient: { x1: 0, x2: 0, y1: 500, y2: 500 },
        stops: [
          [0, 'rgb(255, 255, 255)'],
          [1, 'rgb(240, 240, 255)'],
        ],
      },
      borderWidth: 2,
      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
      plotShadow: true,
      plotBorderWidth: 1,
    },

    title: {
      text: 'Fruit Consumption',
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges'],
    },
    yAxis: {
      title: {
        text: 'Fruit eaten',
      },
    },

    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'middle',
      enabled: false,
    },

    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        marker: {
          enabled: false,
        },
      },
      series: {
        // label: {
        //   connectorAllowed: false,
        // },
        // pointStart: 2010,
      },
    },

    series: [
      {
        type: 'bar',
        name: 'John',
        data: [5, 7, 3],
      },
      {
        type: 'bar',
        color: 'Red',
        name: 'John',
        data: [4, 2, 7],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
