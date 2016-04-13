import {Message} from '../../feature/prime/api/message';

export class ProgressBarDemo {
  value: number = 0;

  msgs: Message[];

  attached() {
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if(this.value >= 100) {
        this.value = 100;
        this.msgs = [{severity: 'info', summary: 'Success', detail: 'Process Completed'}];
        clearInterval(interval);
      }
    }, 2000);
  }
}
