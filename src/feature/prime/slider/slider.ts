import {autoinject,bindable,customElement} from 'aurelia-framework';

@customElement('p-slider')
export class SliderComponent {
  @bindable animate: boolean;
  @bindable disabled: boolean;
  @bindable min: number;
  @bindable max: number;
  @bindable orientation: string;
  @bindable step: number;
  @bindable range: boolean;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable onChange;
  @bindable value:any;

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};
  initialized: boolean;

  constructor(private element:Element){
    this.initialized=false;
  }

  attached(){
    jQuery(this.element.firstElementChild).slider({
      animate: this.animate,
      disabled: this.disabled,
      max: this.max,
      min: this.min,
      orientation: this.orientation,
      range: this.range,
      step: this.step,
      value: this.value,
      values: this.value,
      slide: (event: Event, ui: any) => {
        this.value = ui.value;
        if(this.range) {
          if(this.onChange){
            this.onChange({originalEvent: event, values: ui.values});
          }
        }
        else {
          if(this.onChange){
            this.onChange({originalEvent: event, value: ui.value});
          }
        }
      }
    });
    this.initialized = true;
  }
}
