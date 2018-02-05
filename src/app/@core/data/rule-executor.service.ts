import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { GreetingRequest } from './greeting-request';
import { Customer } from './customer';

@Injectable()
export class RuleExecutorService {

  private _containerName: string = 'services/rest/server/containers';
  constructor(private _http: Http) { }

  postGreetingRules(value: any): Observable<any> {
    // /services/rest/server/containers/instances/mortgages
    const _containerInstance = '/instances/customer-greeting';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' + btoa(value.dmApiUserName + ':' + value.dmApiPassword));
    const options = new RequestOptions({ headers: headers });
    return this._http.post(
      value.dmApiUrl + this._containerName + _containerInstance,  
      this.getCommandRequest(value), options).map((r: Response) => r.json().result);
  }

  private getCommandRequest(value:any): any { 
    const commandRequest = {
      "commands": [],
    };

    const insertGreetingRequestCommand = {
      'insert': {
        'object': { 'com.myteam.customer_greeting.GreetingRequest': this.getGreetingRequest(value) },
        'out-identifier': 'greetingRequest',
        'return-object': false,
      },
    };
    commandRequest.commands.push(insertGreetingRequestCommand);

    const insertCustomerCommand = {
      'insert': {
        'object': { 'com.myteam.customer_greeting.Customer': this.getCustomer(value) },
        'out-identifier': 'customer',
        'return-object': false,
      },
    };
    commandRequest.commands.push(insertCustomerCommand);
    commandRequest.commands.push({'fire-all-rules': {}});
    return commandRequest;
  }

  private getGreetingRequest(value: any): GreetingRequest {
    const greetingRequest: GreetingRequest = new GreetingRequest();
    if(value.useCurrent || value.currentHour < 0 || value.currentHour > 23) {
      const d = new Date(); 
      greetingRequest.currentHour = d.getHours();
    } else {
      greetingRequest.currentHour = value.currentHour;
    }
    return greetingRequest;
  }

  private getCustomer(value: any): Customer {
    const customer: Customer = new Customer();
    customer.gender = value.selGender;
    customer.maritalStatus = value.selMaritalStatus;
    return customer;
  }

}
