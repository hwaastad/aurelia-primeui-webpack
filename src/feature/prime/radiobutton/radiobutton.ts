import {autoinject,customElement,bindable,computedFrom} from 'aurelia-framework';

@customElement('p-radio')
@autoinject()
export class RadioButtonComponent {
  @bindable value: any;
  @bindable name: string;
  @bindable disabled: boolean;
  @bindable model: any;
  @bindable click;
  @bindable checked;

  hover: boolean;

  constructor(private element:Element){

  }

  onclick() {
    console.dir(this.model);
    console.dir(this.value);
    if(this.click){
      this.click(null);
    }
    this.model=this.value;
  }
  
  isChecked() {
    return this.value == this.model;
  }

  modelChanged(newVal,oldVal){
    this.checked = this.model==this.value;
  }

}
