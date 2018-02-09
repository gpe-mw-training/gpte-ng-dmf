import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

import { RuleExecutorService } from '../../@core/data/rule-executor.service';
import { KieContainer } from '../../@core/data/kie-container';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [RuleExecutorService],
})
export class DashboardComponent implements OnInit {

  kieContainers: KieContainer[] = [];
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
          for (let i = 0; i < containers.length; i++) {
            const kContainer: KieContainer = new KieContainer();
            kContainer.alias = containers[i]['container-alias'];
            kContainer.status = containers[i].status;
            this.kieContainers.push(kContainer);
          }
        }
      },
      fail => { this.apiError = true; },
    );
  }

}
