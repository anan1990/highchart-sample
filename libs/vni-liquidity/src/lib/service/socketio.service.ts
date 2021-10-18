/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable()
export class WebsocketService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {
    
  }

  public getNewMessage = () => {
    const socket = io('https://mkw-socket.vndirect.com.vn/socket.io', {
      transports : ['websocket'],
      query: {
        chart: 'liquidity',
      },
    });
    socket.on('connect', function () {
      console.log('Socket Connected');
    });
    socket.on('data', (message) => {
      console.log('Socket data');
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };


}
