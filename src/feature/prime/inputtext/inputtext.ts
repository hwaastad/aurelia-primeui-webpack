import {autoinject,customAttribute,bindable} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

@customAttribute('p-inputtext')
@autoinject()
export class InputText {

  @bindable disabled: boolean = false;
  hover: boolean;
  focus: boolean;
  private onMouseOver;
  private onMouseOut;
  private onBlur;
  private onFocus;

  constructor(private element: Element,private domHandler:DomHandler){
    this._initialize();
  }

  attached(){
    this.domHandler.addMultipleClasses(this.element,'ui-inputtext ui-inputfield ui-corner-all ui-state-default ui-widget');
    if(this.disabled){
      this.domHandler.addClass(this.element,'ui-state-disabled');
    }
    this.element.addEventListener('mouseover', this.onMouseOver);
    this.element.addEventListener('mouseout', this.onMouseOut);
    this.element.addEventListener('focus', this.onFocus);
    this.element.addEventListener('blur', this.onBlur);
  }

  detached(){
    this._deinitialize();
  }

  disabledChanged(newVal,oldVal){
    (newVal == true) ? this.element.setAttribute('disabled','') : this.element.removeAttribute('disabled');
    (newVal==true) ? this.domHandler.addClass(this.element,'ui-state-disabled'):this.domHandler.removeClass(this.element,'ui-state-disabled');
  }

  _initialize(){
    this.onMouseOver = e => {
      console.log('mouseover');
      if(this.disabled==false){
        this.domHandler.addClass(this.element,'ui-state-hover');}
      }
      this.onMouseOut = e => {
        if(this.disabled==false){
          this.domHandler.removeClass(this.element,'ui-state-hover');
        }
      }
      this.onBlur = e => {
        if(this.disabled==false){
          this.domHandler.removeClass(this.element,"ui-state-focus");
        }
      }
      this.onFocus = e => {
        if(this.disabled==false){
          this.domHandler.addClass(this.element,"ui-state-focus");
        }
      }
    }

    _deinitialize(){
      this.element.removeEventListener('mouseover', this.onMouseOver);
      this.element.removeEventListener('mouseout', this.onMouseOut);
      this.element.removeEventListener('focus', this.onFocus);
      this.element.removeEventListener('blur', this.onBlur);
    }

  }
