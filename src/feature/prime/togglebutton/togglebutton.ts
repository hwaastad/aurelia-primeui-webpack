import {autoinject,bindable,customElement} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

@customElement('p-togglebutton')
@autoinject
export class ToggleButtonComponent {
  @bindable onLabel: string = 'Yes';
  @bindable offLabel: string = 'No';
  @bindable onIcon: string;
  @bindable offIcon: string;
  @bindable checked: boolean;
  @bindable disabled: boolean;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable onChange;
  @bindable c;

  private hover: boolean;

  constructor(private element:Element){

  }

  attached(){
    this.init();
  }

  init(){
      console.log('getting icon....');
      let baseClass = 'ui-button-icon-left fa fa-fw';
      this.c= baseClass + ' ' + (this.checked ? this.onIcon : this.offIcon);
  }

  toggle(event) {
    if(!this.disabled) {
      this.checked = !this.checked;
      this.init();
      if(this.onChange){
        this.onChange({
          originalEvent: event,
          checked: !this.checked
        })
      }
    }
  }
}
