import {autoinject,bindable,customElement} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

@customElement('p-spinner')
@autoinject
export class SpinnerComponent {
  @bindable value: number;
  @bindable onChange;
  @bindable step: number = 1;
  @bindable min: number;
  @bindable max: number;
  @bindable maxlength: number;
  @bindable size: number;
  @bindable disabled: boolean;

  private hoverUp: boolean;

  private activeUp: boolean;

  private hoverDown: boolean;

  private activeDown: boolean;

  private precision: number;

  private timer: any;

  constructor(private element:Element,private domHandler:DomHandler){

  }

  attached(){
    if(Math.floor(this.step) === 0) {
      this.precision = this.step.toString().split(/[,]|[.]/)[1].length;
    }

    this.domHandler.findSingle(this.element, 'input').value = (this.value == undefined || this.value === undefined) ? '' : this.value;
  }

  repeat(interval, dir, input) {
    let i = interval||500;

    this.clearTimer();
    this.timer = setTimeout(() => {
      this.repeat(40, dir, input);
    }, i);

    this.spin(dir, input);
  }

  spin(dir: number,inputElement) {
    console.log('spin....')
    let step = this.step * dir;
    let currentValue = this.value||0;
    let newValue = null;

    if(this.precision)
    this.value = parseFloat(this.toFixed(currentValue + step, this.precision));
    else
    this.value = currentValue + step;

    if(this.max !== undefined && this.value.toString().length > this.maxlength) {
      this.value = currentValue;
    }

    if(this.min !== undefined && this.value < this.min) {
      this.value = this.min;
    }

    if(this.max !== undefined && this.value > this.max) {
      this.value = this.max;
    }

    inputElement.value = this.value;
    //this.valueChange.emit(this.value);
  }

  toFixed(value: number, precision: number) {
    let power = Math.pow(10, precision||0);
    return String(Math.round(value * power) / power);
  }

  onUpButtonMousedown(event,input) {
    if(!this.disabled) {
      input.focus();
      this.activeUp = true;
      this.repeat(null, 1, input);

      event.preventDefault();
    }
  }

  onUpButtonMouseup(event) {
    if(!this.disabled) {
      this.activeUp = false;
      this.clearTimer();
    }
  }

  onUpButtonMouseenter(event) {
    if(!this.disabled) {
      this.hoverUp = true;
    }
  }

  onUpButtonMouseleave(event) {
    if(!this.disabled) {
      this.hoverUp = false;
      this.activeUp = false;
      this.clearTimer();
    }
  }

  onDownButtonMousedown(event,input) {
    if(!this.disabled) {
      input.focus();
      this.activeDown = true;
      this.repeat(null, -1, input);

      event.preventDefault();
    }
  }

  onDownButtonMouseup(event) {
    if(!this.disabled) {
      this.activeDown = false;
      this.clearTimer();
    }
  }

  onDownButtonMouseenter(event) {
    if(!this.disabled) {
      this.hoverDown = true;
    }
  }

  onDownButtonMouseleave(event) {
    if(!this.disabled) {
      this.hoverDown = false;
      this.activeDown = false;
      this.clearTimer();
    }
  }

  onInputKeydown(event,inputElement) {
    if(event.which == 38) {
      this.spin(1,inputElement);
      event.preventDefault();
    }
    else if(event.which == 40) {
      this.spin(-1,inputElement);
      event.preventDefault();
    }
  }

  onInput(event) {
    this.value = this.parseValue(event.target.value);
    //this.valueChange.emit(this.value);
  }

  onBlur(inputElement) {
    if(this.value !== undefined && this.value !== null) {
      inputElement.value = this.value;
    }
  }

  parseValue(val: string): number {
    let value: number;
    if(val.trim() === '') {
      value= this.min !== undefined ? this.min : null;
    }
    else {
      if(this.precision)
      value = parseFloat(val);
      else
      value = parseInt(val);

      if(!isNaN(value)) {
        if(this.max !== undefined && value > this.max) {
          value = this.max;
        }

        if(this.min !== undefined && value < this.min) {
          value = this.min;
        }
      }
      else {
        value = null;
      }
    }

    return value;
  }

  handleChange(event) {
    this.onChange.emit(event);
  }

  clearTimer() {
    if(this.timer) {
      clearInterval(this.timer);
    }
  }
}
