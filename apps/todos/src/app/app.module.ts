import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { VniLiquidityModule } from '@abc/vni-liquidity';

const abcModule = [
  VniLiquidityModule
]
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, ...abcModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
