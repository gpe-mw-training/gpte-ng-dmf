import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from '../modals/modal/modal.component';
import { RuleExecutorService } from '../../@core/data/rule-executor.service';

@Component({
    selector: 'ngx-pquote',
    styleUrls: ['./pquote.component.scss'],
    templateUrl: './pquote.component.html',
    providers: [RuleExecutorService],
})
export class PquoteComponent {

    constructor(private _res: RuleExecutorService, private _ms: NgbModal) { }

    onSubmit(value: any) {
        this._res.postPquoteRules(value).subscribe(
            response => {
                let index = 0;
                if (response['execution-results'].results[0].key === 'policy') {
                    index = 0;
                } else {
                    index = 1;
                }
                const resultsIndex = response['execution-results'].results[index];
                const resultsPackage = resultsIndex.value['com.myteam.policy_quote.Policy'];

                const activeModal = this._ms.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
                activeModal.componentInstance.modalHeader = 'Policy Quote Evaluated';
                let rejectReason: String;
                rejectReason = resultsPackage.rejectReason;
                if (rejectReason && rejectReason.length > 1) {
                    let rejectMessage = 'We are not able to grant you a quote because: ';
                    rejectMessage = rejectMessage + rejectReason;
                    activeModal.componentInstance.modalContent = rejectMessage;
                } else {
                    let approvalMessage = 'Here is the pricing details -- ';
                    approvalMessage = approvalMessage + '|discount|: $';
                    approvalMessage = approvalMessage + resultsPackage.priceDiscount;
                    approvalMessage = approvalMessage + '|surcharge|: $';
                    approvalMessage = approvalMessage + resultsPackage.priceSurcharge;
                    approvalMessage = approvalMessage + '|Total Price|: $';
                    approvalMessage = approvalMessage + resultsPackage.price;
                    activeModal.componentInstance.modalContent = approvalMessage;
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
