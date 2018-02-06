import { Component } from '@angular/core';

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
    public isError = false;
    public isCompleted = false;
    public isApproved = false;
    public loanApprovedRate = 0;
    public loanInsuranceCost = 0;
    public loanRejectReason = 'UNKNOWN';
    public applicationResult;
    constructor(private _ruleExecutorService: RuleExecutorService) { }

    onSubmit(value: any) {
        this.loading = true;
        this.isError = false;
        this.applicationResult = null;
        this.isCompleted = false;
        this.isApproved = false;
        this._ruleExecutorService.postMortgagesRules(
            value)
            .subscribe(
            response => {
                this.applicationResult = response;
                this.loading = false;
                this.isCompleted = true;

                let index = 0;
                if (response['execution-results'].results[0].key === 'loanApplication') {
                    index = 0;
                } else {
                    index = 1;
                }

                const resultsIndex = response['execution-results'].results[index];
                const resultsPackage = resultsIndex.value['mortgages.mortgages.LoanApplication'];

                this.isApproved = resultsPackage.approved;
                if (this.isApproved) {
                    this.loanApprovedRate = resultsPackage.approvedRate;
                    this.loanInsuranceCost = resultsPackage.insuranceCost;
                } else {
                    this.loanRejectReason = resultsPackage.explanation;
                }
            },
            fail => { this.loading = false; this.isError = true; });
    }
}
