import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

import { RuleExecutorService } from '../../@core/data/rule-executor.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [RuleExecutorService],
})
export class DashboardComponent implements OnInit {

  greetingReady: boolean = false;
  ppriceReady: boolean = false;
  pquoteReady: boolean = false;
  mortgagesReady: boolean = false;
  detectedContainers: boolean = false;
  apiUrl = environment.dmApiUrl;
  apiError = false;

  constructor(private _res: RuleExecutorService) { }

  ngOnInit(): void {
    this._res.getAllContainers().subscribe(
      response => {
        if (response) {
          const kcs = 'kie-containers';
          const kc = 'kie-container';
          const containers = response['result'][kcs][kc];
          this.detectedContainers = containers.length > 0;
          for (let i = 0; i < containers.length; i++) {
            const alias = containers[i]['container-alias'];
            const status = containers[i].status;
            if (alias === 'customer-greeting' && status === 'STARTED') {
              this.greetingReady = true;
            }
            if (alias === 'mortgages' && status === 'STARTED') {
              this.mortgagesReady = true;
            }
            if (alias === 'policy-quote' && status === 'STARTED') {
              this.pquoteReady = true;
            }
            if (alias === 'policy-price' && status === 'STARTED') {
              this.ppriceReady = true;
            }
          }
        }
      },
      fail => { this.apiError = true; },
    );
  }

}
