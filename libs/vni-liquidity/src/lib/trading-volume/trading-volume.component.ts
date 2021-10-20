import { Component, OnInit } from '@angular/core';
import { LiquidityService } from '../service/liquidity.service';
import { WebsocketService } from '../service/socketio.service';
import * as Highcharts from 'highcharts';
import { MarketTradingData } from '../model/liquidity.model';

@Component({
  selector: 'abc-trading-volume',
  templateUrl: './trading-volume.component.html',
  styleUrls: ['./trading-volume.component.scss'],
})
export class TradingVolumeComponent implements OnInit {
  todayVolume: number[] = [];
  previousVolume: number[] = [];
  updateFromInput: boolean = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartCallback: any;
  chart: any;
  chartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    xAxis: {
      allowDecimals: false,
      // labels: {
      //   formatter: function () {
      //     return this.value; // clean, unformatted number for year
      //   },
      // },
      accessibility: {
        rangeDescription: 'Range: 1940 to 2017.',
      },
      // categories: ['Apples', 'Bananas', 'Oranges'],
    },
    yAxis: {
      title: {
        text: 'Trading value (bil. VND)',
      },
      // labels: {
      //   formatter: function () {
      //     // return this.value / 1000 + 'k';
      //   },
      // },
    },
    series: [
      {
        data: this.todayVolume,
        type: 'area',
        color: '#abc431',
        name: 'Today trading value',
      },
      {
        data: this.previousVolume,
        type: 'area',
        color: '#123dfe',
        name: 'Previous trading value',
      },
    ],
  };

  constructor(
    private socketService: WebsocketService,
    private liquidityService: LiquidityService
  ) {
    const self = this;

    this.chartCallback = (chart: any) => {
      self.chart = chart;
    };
  }
  messageList: string[] = [];
  ngOnInit() {
    // this.socketService.getNewMessage().subscribe((message: string) => {
    //   this.messageList.push(message);
    //   console.log('---' + JSON.stringify(this.messageList));
    // });
    // this.chart.showLoading();
    this.liquidityService
      .getTradingVolume('VNINDEX')
      .subscribe((result: MarketTradingData[]) => {
        this.todayVolume = result.map((dt) => {
          return dt.value;
        });
        this.updateFromInput = true;
        this.updateData(this.todayVolume, this.previousVolume);
      });

    this.liquidityService
      .getPreTradingVolume('VNINDEX')
      .subscribe((result: MarketTradingData[]) => {
        this.previousVolume = result.map((dt) => {
          return dt.value;
        });
        this.updateFromInput = true;
        this.updateData(this.todayVolume, this.previousVolume);
      });
  }

  updateData(today: number[], previousDay: number[]) {
    this.chartOptions.series = [
      {
        data: today,
        type: 'area',
        name: 'Today trading value',
      },
      {
        data: previousDay,
        type: 'area',
        name: 'Today trading value',
      },
    ];

    this.updateFromInput = true;
    this.chart.hideLoading();
  }

  onUpdateData() {
    this.chart.showLoading();
    // this.dataService.getChartData();
  }
}
