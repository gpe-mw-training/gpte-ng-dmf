import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
  ],
})
export class DashboardModule { }
