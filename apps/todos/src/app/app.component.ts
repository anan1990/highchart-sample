import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'abc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  constructor(public router: Router){
  }

}
