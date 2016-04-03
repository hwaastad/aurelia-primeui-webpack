import {bindable,autoinject,customElement} from 'aurelia-framework';

@customElement('p-calendar')
@autoinject
export class CalendarComponent {
  @bindable value: string;
  @bindable valueChange;
  @bindable readonlyInput: boolean;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable inputStyle: string;
  @bindable inputStyleClass: string;
  @bindable placeholder: string='';
  @bindable inline: boolean = false;
  @bindable showAnim: string;
  @bindable dateFormat: string;
  @bindable showButtonPanel: boolean;
  @bindable monthNavigator: boolean;
  @bindable yearNavigator: boolean;
  @bindable numberOfMonths: number;
  @bindable showWeek: boolean;
  @bindable showOtherMonths: boolean;
  @bindable selectOtherMonths: boolean;
  @bindable defaultDate: any;
  @bindable minDate: any;
  @bindable maxDate: any;
  @bindable disabled: any
  @bindable showIcon: boolean;
  @bindable onSelect;
  hovered: boolean;
  focused: boolean;
  initialized: boolean;
  stopNgOnChangesPropagation: boolean;
  calendarElement: any;

  constructor(private element: Element){
    this.initialized = false;
  }

  attached(){
    this.calendarElement = this.inline ? jQuery(this.element.children[0]) : jQuery(this.element.children[0].children[0]);
    this.calendarElement.datepicker({
      showAnim: this.showAnim,
      dateFormat: this.dateFormat,
      showButtonPanel: this.showButtonPanel,
      changeMonth: this.monthNavigator,
      changeYear: this.yearNavigator,
      numberOfMonths: this.numberOfMonths,
      showWeek: this.showWeek,
      showOtherMonths: this.showOtherMonths,
      selectOtherMonths: this.selectOtherMonths,
      defaultDate: this.defaultDate,
      minDate: this.minDate,
      maxDate: this.maxDate,
      onSelect: (dateText: string) => {
        this.stopNgOnChangesPropagation = true;
        if(this.onSelect){
          this.onSelect(dateText);
        }
        if(this.valueChange){
          this.valueChange(dateText);
        }
      }
    });
    this.initialized = true;
  }

  detached(){
    this.calendarElement.datepicker('destroy');
    this.calendarElement = null;
    this.initialized = false;
  }

  propertyChanged(property,newVal,oldVal){
    if (this.initialized) {
      if(property == 'value' && this.stopNgOnChangesPropagation) {
        return;
      }
      this.calendarElement.datepicker('option', property, newVal);
    }
  }

  onButtonClick(event,input) {
    input.focus();
  }
}
