import {autoinject,bindable,customElement} from 'aurelia-framework';
import {Message} from '../api/message';

@customElement('p-growl')
@autoinject
export class GrowlComponent {
  @bindable sticky: boolean;
  @bindable life: number;
  @bindable value: Message[];
  initialized: boolean;

  constructor(private element:Element){
    this.initialized=false;
  }

  attached(){
    console.log('attached')
    jQuery((<HTMLElement>this.element).children[0]).puigrowl({
      sticky: this.sticky,
      life: this.life,
      appendTo: null,
      messages: this.value
    });
    this.initialized = true;
  }

  detached(){
    jQuery((<HTMLElement>this.element).children[0]).puigrowl('destroy');
    this.initialized = false;
  }

  valueChanged(newVal,oldVal){
    if(this.initialized){
      jQuery((<HTMLElement>this.element).children[0]).puigrowl('option', 'value', newVal);
    }
  }
}
