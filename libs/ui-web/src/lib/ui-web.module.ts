import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiWebComponent } from './ui-web/ui-web.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes =[
  {
    path:'',
    component: UiWebComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(routes)],
  declarations: [
    UiWebComponent
  ],
})
export class UiWebModule {}
