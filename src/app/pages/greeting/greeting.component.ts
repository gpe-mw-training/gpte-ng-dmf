import { Component } from '@angular/core';

import { RuleExecutorService } from '../../@core/data/rule-executor.service';

@Component({
    selector: 'ngx-greeting',
    styleUrls: ['./greeting.component.scss'],
    templateUrl: './greeting.component.html',
    providers: [ RuleExecutorService, ],
})
export class GreetingComponent {
    defaultGender = 'Male';
  defaultMaritalStatus = 'Single';
  isError = false;
  isCompleted = false;
  useCurrent = false;
  loading = false;

  greeting = '';
  salutation = '';

  constructor(private _ruleExecutorService: RuleExecutorService) { }

  onSubmit(value: any) {
    this.loading = true;
    this.isError = false;
    this.isCompleted = false;

    this._ruleExecutorService.postGreetingRules(value).subscribe( 
      response => { 
        this.loading = false; 
        const gResponsePackage = 'com.myteam.customer_greeting.GreetingResponse'; 
        const executionResultIndex = response['execution-results'].results[0].value[gResponsePackage]; 
        this.greeting = executionResultIndex.greeting; 
        this.salutation = executionResultIndex.salutation; 
      }, 
      fail => { this.loading = false; this.isError = true; },
    ); 
  } 
}
