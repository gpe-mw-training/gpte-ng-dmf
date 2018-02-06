import { Component } from '@angular/core';
import { RuleExecutorService } from '../../@core/data/rule-executor.service';

@Component({
    selector: 'ngx-pquote',
    styleUrls: ['./pquote.component.scss'],
    templateUrl: './pquote.component.html',
    providers: [RuleExecutorService],
})
export class PquoteComponent {
    onSubmit(value: any) {
        // console.log(value);
    }
}
