import {NgModule} from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PquoteComponent } from './pquote.component';

@NgModule({
    imports: [
        ThemeModule,
    ],
    declarations: [
        PquoteComponent,
    ],
})
export class PquoteModule {}
