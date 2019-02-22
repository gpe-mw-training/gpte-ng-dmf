import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SettingsComponent } from './settings.component';

@NgModule({
    imports: [
        ThemeModule,
    ],
    declarations: [
        SettingsComponent,
    ],
})
export class SettingsModule {}
