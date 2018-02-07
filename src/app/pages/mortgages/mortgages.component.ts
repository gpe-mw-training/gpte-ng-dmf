import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from '../modals/modal/modal.component';
import { RuleExecutorService } from '../../@core/data/rule-executor.service';

@Component({
    selector: 'ngx-mortgages',
    styleUrls: ['./mortgages.component.scss'],
    templateUrl: './mortgages.component.html',
    providers: [RuleExecutorService],
})
export class MortgagesComponent {
    public defaultCreditRate = 'OK';
    public defaultIncomeType = 'Job';
    public bankruptcyDetected = false;
    public incomeValidated = false;
    public loading = false;
    constructor(private _ruleExecutorService: RuleExecutorService, private modalService: NgbModal) { }

    onSubmit(value: any) {
        this.loading = true;
        this._ruleExecutorService.postMortgagesRules(
            value)
            .subscribe(
            response => {
                this.loading = false;

                let index = 0;
                if (response['execution-results'].results[0].key === 'loanApplication') {
                    index = 0;
                } else {
                    index = 1;
                }

                const resultsIndex = response['execution-results'].results[index];
                const resultsPackage = resultsIndex.value['mortgages.mortgages.LoanApplication'];

                const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
                activeModal.componentInstance.modalHeader = 'Mortgage Loan Evaluated';
                if (resultsPackage.approved) {
                    let approvalMessage = 'Your loan has been approved     ';
                    approvalMessage = approvalMessage + '    |Approved Rate|:';
                    approvalMessage = approvalMessage + resultsPackage.approvedRate;
                    approvalMessage = approvalMessage + '    |Insurance Cost|:';
                    approvalMessage = approvalMessage + resultsPackage.insuranceCost;
                    activeModal.componentInstance.modalContent = approvalMessage;
                } else {
                    let rejectMessage = 'Your loan has been rejected     ';
                    if (resultsPackage.explanation)
                        rejectMessage = rejectMessage + resultsPackage.explanation;
                    activeModal.componentInstance.modalContent = rejectMessage;
                }
            },
            fail => {
                this.loading = false;
                if (fail.status > 0) {
                    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
                    activeModal.componentInstance.modalHeader = 'Unable to evaluate';
                    const errMessage = `The configured URL for the API is not recognized as an Execution Server`;
                    activeModal.componentInstance.modalContent = errMessage;
                } else {
                    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
                    activeModal.componentInstance.modalHeader = 'Unable to evaluate';
                    activeModal.componentInstance.modalContent = `The configured URL for the API is unavailable`;
                }
            },
        );
    }
}
