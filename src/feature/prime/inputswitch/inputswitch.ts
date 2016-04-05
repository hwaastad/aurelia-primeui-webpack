import {autoinject,customElement,bindable} from 'aurelia-framework';

@customElement('p-inputswitch')
@autoinject()
export class InputSwitchComponent {
  @bindable onLabel: string = 'On';
  @bindable offLabel: string = 'Off';
  @bindable checked: boolean;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable onChange;

  initialized: boolean;

  stopNgOnChangesPropagation: boolean;

  inputSwitchElement: any;

  constructor(private element:Element){
    this.initialized = false;
  }

  attached(){
    setTimeout(() => {
      this.inputSwitchElement = jQuery(this.element.firstElementChild).find('> .ui-helper-hidden-accessible > input');
      this.inputSwitchElement.puiswitch({
        checked: this.checked,
        enhanced: true,
        change: (event: Event, ui: PrimeUI.InputSwitchEventParams) => {
          this.stopNgOnChangesPropagation = true;
          this.checked = ui.checked;
          if (this.onChange) {
            this.onChange({originalEvent: event, checked: ui.checked});
          }
        }
      });
      this.initialized = true;
    }, 10);
  }

  checkedChanged(newVal,oldVal){
    this
  }

  detatched(){
    this.inputSwitchElement.puiswitch('destroy');
    this.initialized = false;
    this.inputSwitchElement = null;
  }
}
