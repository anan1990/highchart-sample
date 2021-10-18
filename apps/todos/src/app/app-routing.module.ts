import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@abc/ui-web').then((m) => m.UiWebModule),
  },
  {
    path: 'marketwatch',
    loadChildren: () =>
      import('@abc/vni-liquidity').then((m) => m.VniLiquidityModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
