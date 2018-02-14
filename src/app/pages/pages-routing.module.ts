import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GreetingComponent } from './greeting/greeting.component';
import { MortgagesComponent } from './mortgages/mortgages.component';
import { PquoteComponent } from './pquote/pquote.component';
import { PolicyPriceComponent } from './policy-price/policy-price.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'greeting',
    component: GreetingComponent,
  }, {
    path: 'mortgages',
    component: MortgagesComponent,
  }, {
    path: 'pquote',
    component: PquoteComponent,
  }, {
    path: 'policy-price',
    component: PolicyPriceComponent,
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
