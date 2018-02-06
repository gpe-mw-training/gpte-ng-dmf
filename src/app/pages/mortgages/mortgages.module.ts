import {NgModule} from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { MortgagesComponent } from './mortgages.component';

@NgModule({
    imports: [
        ThemeModule,
    ],
    declarations: [
        MortgagesComponent,
    ],
})
export class MortgagesModule { }
