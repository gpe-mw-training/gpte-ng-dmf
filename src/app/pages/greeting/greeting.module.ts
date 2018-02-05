import {NgModule} from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { GreetingComponent } from './greeting.component';

@NgModule({
    imports: [
        ThemeModule,
    ],
    declarations: [
        GreetingComponent,
    ]
})
export class GreetingModule { }