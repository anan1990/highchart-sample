import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'abc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    colors: ['#000000', '#aaafd3'],
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
    series: [
      {
        data: [1, 2, 3],
        type: 'bar',
        // color: '#abc431',
        name: 'An An',
      },
      {
        type: 'bar',
        // color: '#1326df',
        data: [1, 9, 4],
      },
      {
        type: 'bar',
        color: '#e1d336',
        data: [5, 7, 3],
      },
    ],
  };
}
