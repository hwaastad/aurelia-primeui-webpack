import {autoinject,bindable,customAttribute} from 'aurelia-framework';
import 'primeui';

@customAttribute('p-password')
@autoinject
export class PasswordAttribute {
  @bindable promptLabel: string;
  @bindable weakLabel: string;
  @bindable goodLabel: string;
  @bindable strongLabel: string;
  @bindable inline: boolean;
  @bindable disabled: boolean;
  initialized: boolean;

  constructor(private element:Element){
    this.initialized=false;
  }

  attached(){
    jQuery(this.element).puipassword({
      promptLabel: this.promptLabel,
      weakLabel: this.weakLabel,
      goodLabel: this.goodLabel,
      strongLabel: this.strongLabel,
      inline: this.inline
    });
    this.initialized=true;
  }

  propertyChanged(property,newVal,oldVal){
    if(this.initialized){
      jQuery(this.element).puipassword('option',property,newVal);
    }
  }

  detached(){
    if(this.initialized){
      jQuery(this.element).puipassword('destroy');
    }
    this.initialized=false;
  }

}
