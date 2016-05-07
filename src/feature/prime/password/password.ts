import {autoinject,bindable,customAttribute} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';
import 'primeui';

@customAttribute('p-password')
@autoinject
export class PasswordAttribute {
  @bindable promptLabel: string = 'Please enter a password';
  @bindable weakLabel: string = 'Weak';
  @bindable strongLabel: string = 'Strong';
  @bindable mediumLabel: string = 'Medium';

  onMouseover:any;
  onMouseout:any;
  onFocus:any;
  onBlur:any;
  onKeyUp:any;

  panel: any;
  meter: any;
  info: any;

  constructor(private element:Element,private domHandler:DomHandler){
    this.onMouseover = e => {
      this.element.classList.add('ui-state-hover');
    }
    this.onMouseout = e => {
      this.element.classList.remove('ui-state-hover');
    }
    this.onFocus = e => {
      this.element.classList.add('ui-state-focus');
      this.domHandler.removeClass(this.panel, 'ui-helper-hidden');
      this.domHandler.absolutePosition(this.panel, this.element);
      this.domHandler.fadeIn(this.panel, 250);
    }
    this.onBlur = e => {
      this.element.classList.remove('ui-state-focus');
      this.domHandler.addClass(this.panel, 'ui-helper-hidden');
    }
    this.onKeyUp = e => {
      let value = e.target.value,
      label = null,
      meterPos = null;

      if(value.length === 0) {
        label = this.promptLabel;
        meterPos = '0px 0px';
      }
      else {
        var score = this.testStrength(value);

        if(score < 30) {
          label = this.weakLabel;
          meterPos = '0px -10px';
        }
        else if(score >= 30 && score < 80) {
          label = this.mediumLabel;
          meterPos = '0px -20px';
        }
        else if(score >= 80) {
          label = this.strongLabel;
          meterPos = '0px -30px';
        }
      }

      this.meter.style.backgroundPosition = meterPos;
      this.info.textContent = label;
    }
  }

  attached(){
    this.domHandler.addMultipleClasses(this.element,'ui-inputtext ui-corner-all ui-state-default ui-widget')
    this.panel = document.createElement('div');
    this.panel.className = 'ui-password-panel ui-widget ui-state-highlight ui-corner-all ui-helper-hidden ui-password-panel-overlay';
    this.meter = document.createElement('div');
    this.meter.className = 'ui-password-meter';
    this.info = document.createElement('div');
    this.info.className = 'ui-password-info';
    this.info.textContent = this.promptLabel;
    if((<HTMLInputElement>this.element).disabled){
      this.element.classList.add('ui-state-disabled');
    }

    this.panel.appendChild(this.meter);
    this.panel.appendChild(this.info);

    document.body.appendChild(this.panel);
    this.element.addEventListener('mouseover',this.onMouseover);
    this.element.addEventListener('mouseout',this.onMouseout);
    this.element.addEventListener('focus',this.onFocus);
    this.element.addEventListener('keyup',this.onKeyUp);
    this.element.addEventListener('blur',this.onBlur);
  }

  testStrength(str: string) {
    let grade: number = 0;
    let val;

    val = str.match('[0-9]');
    grade += this.normalize(val ? val.length : 1/4, 1) * 25;

    val = str.match('[a-zA-Z]');
    grade += this.normalize(val ? val.length : 1/2, 3) * 10;

    val = str.match('[!@#$%^&*?_~.,;=]');
    grade += this.normalize(val ? val.length : 1/6, 1) * 35;

    val = str.match('[A-Z]');
    grade += this.normalize(val ? val.length : 1/6, 1) * 30;

    grade *= str.length / 8;

    return grade > 100 ? 100 : grade;
  }

  normalize(x, y) {
    let diff = x - y;

    if(diff <= 0)
    return x / y;
    else
    return 1 + 0.5 * (x / (x + y/4));
  }

  isDisabled() {
    return (<HTMLInputElement>this.element).disabled;
  }

  detached(){
    this.element.removeEventListener('mouseover',this.onMouseover);
    this.element.removeEventListener('mouseout',this.onMouseout);
    this.element.removeEventListener('focus',this.onFocus);
    this.element.removeEventListener('keyup',this.onKeyUp);
    this.element.removeEventListener('keyup',this.onBlur);
    this.panel.removeChild(this.meter);
    this.panel.removeChild(this.info);
    document.body.removeChild(this.panel);
    this.panel = null;
    this.meter = null;
    this.info = null;
  }

}
