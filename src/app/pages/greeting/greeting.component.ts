import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from '../modals/modal/modal.component';
import { RuleExecutorService } from '../../@core/data/rule-executor.service';

@Component({
  selector: 'ngx-greeting',
  styleUrls: ['./greeting.component.scss'],
  templateUrl: './greeting.component.html',
  providers: [RuleExecutorService],
})
export class GreetingComponent {
  defaultGender = 'Male';
  defaultMaritalStatus = 'Single';
  useCurrent = false;
  loading = false;

  greeting = '';
  salutation = '';

  constructor(private _ruleExecutorService: RuleExecutorService, private modalService: NgbModal) { }

  onSubmit(value: any) {
    this.loading = true;
    this._ruleExecutorService.postGreetingRules(value).subscribe(
      response => {
        if (response) {
          this.loading = false;
          const gResponsePackage = 'com.myteam.customer_greeting.GreetingResponse';
          const executionResultIndex = response['execution-results'].results[0].value[gResponsePackage];
          this.greeting = executionResultIndex.greeting;
          this.salutation = executionResultIndex.salutation;

          const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
          activeModal.componentInstance.modalHeader = 'Greeting Evaluated';
          activeModal.componentInstance.modalContent = this.greeting + ', ' + this.salutation + value.customerName;
        } else {
          const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
          activeModal.componentInstance.modalHeader = 'Unable to evaluate';
          const errMessage = `Please make sure you have the greeting project deployed in the execution server.`;
          activeModal.componentInstance.modalContent = errMessage;
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
