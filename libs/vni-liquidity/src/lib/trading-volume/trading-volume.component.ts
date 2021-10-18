import { Component, OnInit } from '@angular/core';
import { LiquidityService } from '../service/liquidity.service';
import { WebsocketService } from '../service/socketio.service';
import * as Highcharts from 'highcharts';
import { MarketTradingData } from '../model/liquidity.model';

@Component({
  selector: 'abc-trading-volume',
  templateUrl: './trading-volume.component.html',
  styleUrls: ['./trading-volume.component.scss']
})
export class TradingVolumeComponent implements OnInit {
  data: number[] = [];
  updateFromInput: boolean = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartCallback: any;
  chart : any;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'US and USSR nuclear stockpiles',
    },
    subtitle: {
      text:
        'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
        'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
        'armscontrol.org</a>',
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
        text: 'Nuclear weapon states',
      },
      // labels: {
      //   formatter: function () {
      //     // return this.value / 1000 + 'k';
      //   },
      // },
    },
    series: [
      {
        // data: [19.033, 21.889, 21.889, 70.522, 70.522, 70.522, 312.0427768899999, 315.0427768899999],
        data: this.data,
        type: 'area',
        // color: '#abc431',
        name: 'An An',
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
    //   console.log('---'+ JSON.stringify(this.messageList));
    // });
    // this.chart.showLoading();
    this.liquidityService
      .getTradingVolume('VNINDEX')
      .subscribe((result: MarketTradingData[]) => {
        this.data = result.map((dt) => {
          return dt.value;
        });
        this.updateFromInput = true;
        this.updateData(this.data);
      });
  }

  updateData(data : any) {
    this.chartOptions.series = [
      {
        data: data,
        type: 'area',
        // color: '#abc431',
        name: 'An An',
      }
    ];

    this.updateFromInput = true;
    this.chart.hideLoading();
  }

  onUpdateData() {
    this.chart.showLoading();
    // this.dataService.getChartData();
  }
}
