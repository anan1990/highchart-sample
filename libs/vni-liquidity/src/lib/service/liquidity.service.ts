import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { MarketLiquidity, MarketTradingData } from '../model/liquidity.model';
@Injectable()
export class LiquidityService {
  constructor(private http: HttpClient) {}
  assetData='assets/';

  getTradingVolume(index: string): Observable<MarketTradingData[]> {
    // return this.http
    //   .get<MarketLiquidity>(environment.liquidity + `?index=${index}`)
    //   .pipe(
    //       map((marketLiquidity: MarketLiquidity)=>{
    //         return marketLiquidity.data;
    //       }),
    //    catchError(this.handleError));
    return this.http
      .get<MarketLiquidity>(this.assetData + `data.json`)
      .pipe(
          map((marketLiquidity: MarketLiquidity)=>{
            return marketLiquidity.data;
          }),
       catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
