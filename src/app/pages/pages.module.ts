import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { GreetingModule } from './greeting/greeting.module';
import { MortgagesModule } from './mortgages/mortgages.module';
import { PquoteModule } from './pquote/pquote.module';
import { PolicyPriceModule } from './policy-price/policy-price.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    GreetingModule,
    MortgagesModule,
    PquoteModule,
    PolicyPriceModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
