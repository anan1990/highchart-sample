import { Component, OnInit } from '@angular/core';
import { LiquidityService } from '../service/liquidity.service';
import { WebsocketService } from '../service/socketio.service';
import * as Highcharts from 'highcharts';
import { MarketTradingData } from '../model/liquidity.model';
import { timer } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'abc-trading-volume',
  templateUrl: './trading-volume.component.html',
  styleUrls: ['./trading-volume.component.scss'],
})
export class TradingVolumeComponent implements OnInit {
  todayVolume: number[] = [];
  previousVolume: number[] = [];
  updateFromInput = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartCallback: any;
  chart: any;
  realtimeData: number[] = [];
  isUpdateChart = true;
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
        data: this.previousVolume,
        type: 'area',
        color: '#808285',
        name: 'Previous trading value',
      },
      {
        data: this.todayVolume,
        type: 'area',
        color: '#f7941f',
        name: 'Today trading value',
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
    this.socketService
      .getNewMessage()
      .subscribe((message: MarketTradingData[]) => {
        // this.messageList = [...message];
        console.log('---' + JSON.stringify(message));
        let tmp = message.map((m) => {
          if (m.index == 'VNINDEX') {
            return m.value;
          } else {
            return 0;
          }
        });
        tmp = tmp.filter((t) => {
          return t != 0;
        });
        this.realtimeData = [...this.realtimeData, ...tmp];
      });
    // this.chart.showLoading();
    this.liquidityService
      .getTradingVolume('VNINDEX')
      .subscribe((result: MarketTradingData[]) => {
        this.todayVolume = result.map((dt) => {
          return dt.value;
        });
        this.updateFromInput = true;
        this.updateData(this.previousVolume, this.todayVolume);
      });

    this.liquidityService
      .getTradingVolume('PRE-VNINDEX')
      .subscribe((result: MarketTradingData[]) => {
        this.previousVolume = result.map((dt) => {
          return dt.value;
        });
        // this.previousVolume = [];
        this.updateFromInput = true;
        this.updateData(this.previousVolume, this.todayVolume);
      });
    this.updateRealtimeDate();
  }

  updateRealtimeDate() {
    timer(3000, 15000).subscribe(() => {
      console.log('updateRealtimeDate: ', this.realtimeData);
      if (this.realtimeData.length > 0) {
        this.todayVolume = [...this.todayVolume, ...this.realtimeData];
        this.updateData(this.previousVolume, this.todayVolume);
      }
      this.realtimeData = [];
    });
  }

  updateData(previousDay: number[], today: number[]) {
    console.log('today', today.length);
    this.chartOptions.series = [
      {
        data: previousDay,
        type: 'area',
        name: 'Previous trading value',
      },
      {
        data: today,
        color: '#f7941f',
        type: 'area',
        name: 'Today trading value',
      },
    ];

    this.updateFromInput = true;
    // this.chart.hideLoading();
  }

  onUpdateData() {
    this.chart.showLoading();
    // this.dataService.getChartData();
  }
}
