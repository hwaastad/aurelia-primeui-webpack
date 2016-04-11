import {Message} from '../../feature/prime/api/message';

export class AccordionDemo {
  msgs: Message[];

  onTabClose(event) {
    console.log('close..');
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index});
  }

  onTabOpen(event) {
    console.log('open..');
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
  }
}
