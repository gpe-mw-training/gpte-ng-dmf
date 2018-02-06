import {NgModule} from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { GreetingComponent } from './greeting.component';
import { ModalComponent } from '../modals/modal/modal.component';

@NgModule({
    imports: [
        ThemeModule,
    ],
    declarations: [
        GreetingComponent,
        ModalComponent,
    ],
    entryComponents: [
        ModalComponent,
    ],
})
export class GreetingModule { }
