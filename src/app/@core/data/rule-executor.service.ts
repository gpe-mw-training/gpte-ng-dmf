import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { GreetingRequest } from './greeting-request';
import { Customer } from './customer';
import { Applicant } from './applicant';
import { IncomeSource } from './income-source';
import { LoanApplication } from './loan-application';
import { Bankruptcy } from './bankruptcy';

@Injectable()
export class RuleExecutorService {

  private _dmApiUrl = 'http://demo-kieserver-dm-dtf.apps.dev37.openshift.opentlc.com/';
  private _dmUserName = 'adminUser';
  private _dmCredentials = 'test1234!';
  private _containerName: string = 'services/rest/server/containers';
  constructor(private _http: Http) { }

  postPquoteRules(value: any): Observable<any> {
    const _containerInstance = '/instances/policy-quote';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' + btoa(this._dmUserName + ':' + this._dmCredentials));
    const options = new RequestOptions({ headers: headers });
    return this._http.post(
      this._dmApiUrl + this._containerName + _containerInstance,
      this.getPolicyQuoteRequest(value), options).map((r: Response) => r.json().result);
  }

  postGreetingRules(value: any): Observable<any> {
    // /services/rest/server/containers/instances/mortgages
    const _containerInstance = '/instances/customer-greeting';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' + btoa(this._dmUserName + ':' + this._dmCredentials));
    const options = new RequestOptions({ headers: headers });
    return this._http.post(
      this._dmApiUrl + this._containerName + _containerInstance,
      this.getGreetingCommandRequest(value), options).map((r: Response) => r.json().result);
  }

  postMortgagesRules(value: any): Observable<any> {
    // /services/rest/server/containers/instances/mortgages
    const _containerInstance = '/instances/mortgages';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' + btoa(this._dmUserName + ':' + this._dmCredentials));
    const options = new RequestOptions({ headers: headers });
    return this._http.post(
      this._dmApiUrl + this._containerName + _containerInstance,
      this.getMortgagesCommandRequest(value), options).map((r: Response) => r.json().result);
  }

  private getMortgagesCommandRequest(value: any): any {
    const commandRequest = {
      'lookup': 'ksession.stateless',
      'commands': [],
    };

    const insertApplicantCommand = {
      'insert': {
        'object': { 'mortgages.mortgages.Applicant': this.getApplicant(value) },
        'out-identifier': 'applicant', 'return-object': true,
      },
    };
    commandRequest.commands.push(insertApplicantCommand);
    const incomeSource: IncomeSource = this.getIncomeSource(value);
    if (incomeSource != null) {
      const insertIncomeSourceCommand = {
        'insert': {
          'object': { 'mortgages.mortgages.IncomeSource': incomeSource },
          'out-identifier': 'incomeSource', 'return-object': false,
        },
      };
      commandRequest.commands.push(insertIncomeSourceCommand);
    }

    const insertApplicationCommand = {
      'insert': {
        'object': { 'mortgages.mortgages.LoanApplication': this.getLoanApplication(value) },
        'out-identifier': 'loanApplication', 'return-object': true,
      },
    };
    commandRequest.commands.push(insertApplicationCommand);

    const bankruptcy: Bankruptcy = this.getBankruptcy(value);
    if (bankruptcy != null) {
      const insertBankruptcyCommand = {
        'insert': {
          'object': { 'mortgages.mortgages.Bankruptcy': bankruptcy },
          'out-identifier': 'bankruptcy', 'return-object': false,
        },
      };
      commandRequest.commands.push(insertBankruptcyCommand);
    }

    commandRequest.commands.push({ 'fire-all-rules': {} });
    return commandRequest;
  }

  private getApplicant(value: any): Applicant {
    const applicant: Applicant = new Applicant();
    applicant.age = value.applicantAge;
    applicant.name = value.applicantName;
    applicant.creditRating = value.selCreditRate;
    applicant.applicationDate = new Date();
    return applicant;
  }

  private getIncomeSource(value: any): IncomeSource {
    if (!value.incomeValidated) {
      return null;
    } else {
      const is: IncomeSource = new IncomeSource();
      is.amount = value.incomeAmount;
      is.type = value.selIncomeType;
      return is;
    }
  }

  private getLoanApplication(value: any): LoanApplication {
    const application: LoanApplication = new LoanApplication();
    application.amount = value.loanAmount;
    application.deposit = value.depositAmount;
    application.lengthYears = value.mortgageLength;
    return application;
  }

  private getBankruptcy(value: any): Bankruptcy {
    if (!value.bankruptcyDetected) {
      return null;
    } else {
      const bankruptcy: Bankruptcy = new Bankruptcy();
      bankruptcy.amountOwned = value.bankruptcyAmount;
      bankruptcy.yearOfOccurrence = value.bankruptcyYear;
      return bankruptcy;
    }
  }

  private getGreetingCommandRequest(value: any): any {
    const commandRequest = {
      'commands': [],
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

    const insertGreetingResponseCommand = {
      'insert': {
        'object': { 'com.myteam.customer_greeting.GreetingResponse': {} },
        'out-identifier': 'response',
        'return-object': true,
      },
    };
    commandRequest.commands.push(insertGreetingResponseCommand);
    commandRequest.commands.push({ 'fire-all-rules': {} });
    return commandRequest;
  }

  private getGreetingRequest(value: any): GreetingRequest {
    const greetingRequest: GreetingRequest = new GreetingRequest();
    if (value.useCurrent || value.currentHour < 0 || value.currentHour > 23) {
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

  private getPolicyQuoteRequest(value: any): any {
    const commandRequest = {
      'commands': [],
    };

    const insertDriverCommand = {
      'insert': {
        'object': {
          'com.myteam.policy_quote.Driver': {
            'driverName': value.name,
            'age': value.age,
            'creditRate': value.creditRate,
            'numberOfAccidents': value.accidents,
            'numberOfTickets': value.tickets,
          },
        },
        'out-identifier': 'driver',
        'return-object': true,
      },
    };
    commandRequest.commands.push(insertDriverCommand);

    const insertPolicyCommand = {
      'insert': {
        'object': {
          'com.myteam.policy_quote.Policy': {
            'policyType': 'AUTO',
            'vehicleYear': value.year,
            'plates': value.plates,
            'platesStateCode': value.selPlatesState,
          },
        },
        'out-identifier': 'policy',
        'return-object': true,
      },
    };
    commandRequest.commands.push(insertPolicyCommand);
    commandRequest.commands.push({ 'fire-all-rules': {} });
    return commandRequest;
  }

}
