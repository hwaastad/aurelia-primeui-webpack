import {bindable,customElement,autoinject,computedFrom} from 'aurelia-framework';
import {Message} from '../api/message';

@customElement('p-messages')
@autoinject()
export class MessagesComponent {
  @bindable value: Message[];
  @bindable valueChange;
  @bindable closable: boolean = true;

  constructor(private element:Element){

  }

  @computedFrom('value')
  get hasMessages() {
    return this.value && this.value.length > 0;
  }

  getSeverityClass() {
    return this.value[0].severity;
  }

  clear(event) {
    if(this.valueChange){
      this.valueChange([]);
    }
    this.value=undefined;
    event.preventDefault();
  }
}
