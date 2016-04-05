import {autoinject,customAttribute,bindable} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';


@customAttribute('p-inputtextarea')
@autoinject()
export class InputTextAreaAttribute {
  @bindable autoResize: boolean=undefined;
  @bindable rows: number;
  @bindable cols: number;

  hover: boolean;
  focus: boolean;
  rowsDefault: number;
  colsDefault: number;

  private onMouseOver;
  private onMouseOut;
  private onFocus;
  private onBlur;
  private onKeyup;


  constructor(private element:Element,private domHandler: DomHandler){
    this.onMouseOver= e =>{
      this.domHandler.addClass(this.element,'ui-state-hover');
    };
    this.onMouseOut= e =>{
      this.domHandler.removeClass(this.element,'ui-state-hover');
    };
    this.onFocus= e =>{
      this.domHandler.addClass(this.element,'ui-state-focus');
    };
    this.onBlur = e => {
      this.domHandler.removeClass(this.element,'ui-state-focus');
    };
    this.onKeyup = e => {
      console.log(this.autoResize);
      if(this.autoResize){
        this.resize();
      }
    }
  }

  bind(){
    this.rowsDefault = this.rows;
    this.colsDefault = this.cols;
  }

  attached(){
    this.domHandler.addMultipleClasses(this.element,'ui-inputtext ui-inputfield ui-corner-all ui-state-default ui-widget');
    this.element.addEventListener('mouseover',this.onMouseOver);
    this.element.addEventListener('mouseout',this.onMouseOut);
    this.element.addEventListener('blur',this.onBlur);
    this.element.addEventListener('focus',this.onFocus);
    this.element.addEventListener('keyup',this.onKeyup);
  }

  detatched(){
    this.element.removeEventListener('mouseover',this.onMouseOver);
    this.element.removeEventListener('mouseout',this.onMouseOut);
    this.element.removeEventListener('blur',this.onBlur);
    this.element.removeEventListener('focus',this.onFocus);
    this.element.removeEventListener('keyup',this.onKeyup);
  }

  resize () {
        let linesCount = 0,
        lines = (<HTMLInputElement>this.element).value.split('\n');
        console.log('lines: ' + lines);
        for(let i = lines.length-1; i >= 0 ; --i) {
            linesCount += Math.floor((lines[i].length / this.colsDefault) + 1);
        }

        this.rows = (linesCount >= this.rowsDefault) ? (linesCount + 1) : this.rowsDefault;
        this.domHandler.addAttributes(this.element,{'rows':this.rows});
    }

  isDisabled() {
    //return this.element.disabled;
  }

  isInvalid() {
    //  return !this.control.valid;
  }
}
