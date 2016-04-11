import {Message} from '../../feature/prime/api/message';

export class TabViewDemo  {
  msgs: Message[];

    onTabChange(event) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }
}
