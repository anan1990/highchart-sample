/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { MarketTradingData } from '../model/liquidity.model';

@Injectable()
export class WebsocketService {
  public message$: BehaviorSubject<Array<MarketTradingData>> = new BehaviorSubject<MarketTradingData[]>([]);;
  constructor() {}

  public getNewMessage = () => {
    const socket = io('https://mkw-socket.vndirect.com.vn/socket.io', {
      transports: ['websocket'],
      query: {
        chart: 'liquidity',
      },
    });
    socket.on('connect', function () {
      console.log('Socket Connected');
    });
    socket.on('data', (message: MarketTradingData[]) => {
      console.log('Socket data');
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
