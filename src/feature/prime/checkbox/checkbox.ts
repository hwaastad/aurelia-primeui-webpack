import {bindable,autoinject,customElement} from 'aurelia-framework';

@customElement('p-checkbox')
@autoinject()
export class CheckBoxComponent {
  @bindable value: any;
  @bindable name: string;
  @bindable disabled: boolean;
  @bindable model: any;
  @bindable checked: any;
  @bindable onChange;
  @bindable modelChange;
  @bindable checkedChange;

  hover: boolean;


  constructor(private element: Element){

  }

  onClick(input) {
    console.dir(input);
    if(this.disabled) {
      return;
    }
    if(this.onChange){
      this.onChange(!input.checked);
    }
    this.checked = !this.checked;
    if(this.model) {
      if (this.checked)
      this.addValue(input.value);
      else
      this.removeValue(input.value);
      if(this.modelChange){
        this.modelChange(this.model);
      }
    }
    else {
      if(this.checkedChange){
        this.checkedChange(!input.checked);
      }
    }
  }

  isChecked(value) {
    if(this.model){
      if(this.findValueIndex(value) !== -1){
        this.checked=true;
      } else {
        this.checked=false;
      }
    }
    return this.checked;
  }

  removeValue(value) {
    var index = this.findValueIndex(value);
    if(index >= 0) {
      this.model.splice(index, 1);
    }
  }

  addValue(value) {
    this.model.push(value);
  }

  findValueIndex(value) {
    var index: number = -1;
    if(this.model) {
      for (var i = 0; i < this.model.length; i++) {
        if(this.model[i] == value) {
          index = i;
          break;
        }
      }
    }

    return index;
  }
}
