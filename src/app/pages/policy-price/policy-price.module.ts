import {NgModule} from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PolicyPriceComponent } from './policy-price.component';

@NgModule({
    imports: [
        ThemeModule,
    ],
    declarations: [
        PolicyPriceComponent,
    ],
})
export class PolicyPriceModule {}
