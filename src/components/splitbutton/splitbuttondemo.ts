import {Message} from '../../feature/prime/api/message';

export  class SplitButtonDemo {
  constructor(parameters) {

  }

  msgs: Message[] = [];

  save() {
    console.log('save');
    this.msgs = [];
    //this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Saved' });
  }

  update() {
    console.log('save');
    this.msgs = [];
    //this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    console.log('delete');
    this.msgs = [];
    //this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Deleted' });
  }
}
