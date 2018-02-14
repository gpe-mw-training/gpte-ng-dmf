import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from '../modals/modal/modal.component';
import { RuleExecutorService } from '../../@core/data/rule-executor.service';

@Component({
    selector: 'ngx-policy-price',
    styleUrls: ['./policy-price.component.scss'],
    templateUrl: './policy-price.component.html',
    providers: [RuleExecutorService],
})
export class PolicyPriceComponent {
    hasPreviousIncidents: boolean = false;

    constructor(private _res: RuleExecutorService, private _ms: NgbModal) { }

    onSubmit(value: any) {
        this._res.postDMNInsurancePrice(value).subscribe(
            response => {
                const dmnEvaluationResult = response['dmn-evaluation-result'];
                const dmnContext = dmnEvaluationResult['dmn-context'];
                const totalPrice = dmnContext['Insurance Total Price'];

                const activeModal = this._ms.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
                activeModal.componentInstance.modalHeader = 'Insurance Price Evaluated';
                if (totalPrice ) {
                    activeModal.componentInstance.modalContent = 'Insurance Total Price: ' + totalPrice;
                } else {
                    activeModal.componentInstance.modalContent = 'No condition found to calculate a price';
                }
            },
            fail => {
                if (fail.status > 0) {
                    const activeModal = this._ms.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
                    activeModal.componentInstance.modalHeader = 'Unable to evaluate';
                    const errMessage = `The configured URL for the API is not recognized as an Execution Server`;
                    activeModal.componentInstance.modalContent = errMessage;
                } else {
                    const activeModal = this._ms.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
                    activeModal.componentInstance.modalHeader = 'Unable to evaluate';
                    activeModal.componentInstance.modalContent = `The configured URL for the API is unavailable`;
                }
            });
    }
}
