import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from '../modals/modal/modal.component';
import { RuleExecutorService } from '../../@core/data/rule-executor.service';

@Component({
    selector: 'ngx-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent {
    errors = false;
    user: string = 'adminUser';
    password: string = 'r3dh4t1!';
    constructor(private _ms: NgbModal, private _res: RuleExecutorService) { }

    onSubmit(value: any) {
        let url: string = value.route;
        // attach tailing back slash
        if (!url.endsWith('/'))
            url = url + '/';
        this._res.getAllContainers(url, value.user, value.password).subscribe(
            response => {
                if (response) {
                    localStorage.setItem('ksUrl', url);
                    localStorage.setItem('ksUserName', value.user);
                    localStorage.setItem('ksPassword', value.password);
                    const currentLocation: string = window.location.href;
                    window.location.href = currentLocation.replace('pages/settings', 'pages/');
                } else {
                    this.errors = true;
                }
            },
            fail => { this.errors = true; },
        );
    }
}
