import {autoinject,customElement,bindable} from 'aurelia-framework';
import {SelectItem} from '../api/selectitem';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@customElement('p-multiselect')
@autoinject()
export class MultiSelectComponent {
  @bindable value: any[];
  @bindable options: SelectItem[];
  @bindable onChange;
  @bindable scrollHeight: string = '200px';
  @bindable defaultLabel: string = 'Choose';
  @bindable style: string;
  @bindable styleClass: string;
  @bindable disabled: boolean;

  private valuesAsString: string;
  private hover: boolean;
  private focus: boolean;
  private panelVisible: boolean;
  private documentClickListener: any;
  private panel: any;
  private container: any;
  private selfClick: boolean;
  private panelClick: boolean;
  private filterValue: string;
  private visibleOptions: SelectItem[];
  private filtered: boolean;

  constructor(private element: Element,private domHandler: DomHandler){
    this.documentClickListener = e => {
      console.log('klikk')
      if(this.panelClick==true){
        if(!this.selfClick && this.panelVisible) {
          this.hide();
        }
      }

      this.selfClick = false;
      this.panelClick = false;
    }
  }

  bind(){

  }

  attached(){
    this.updateLabel();
    this.container = this.element.firstElementChild;
    this.panel = this.domHandler.findSingle(this.element, 'div.ui-multiselect-panel');
    this.element.addEventListener('click',this.documentClickListener);
  }

  onItemClick(event, value) {
    let selectionIndex = this.findSelectionIndex(value);
    if(selectionIndex != -1) {
      this.value.splice(selectionIndex, 1);
    }
    else {
      this.value = this.value||[];
      this.value.push(value);
    }
    if(this.onChange){
      this.onChange({originalEvent: event, value: this.value});
    }
    //this.valueChange.emit(this.value);
  }

  isSelected(value) {
    return this.findSelectionIndex(value) != -1;
  }

  findSelectionIndex(val: any): number {
    let index = -1;

    if(this.value) {
      for(let i = 0; i < this.value.length; i++) {
        if(this.value[i] == val) {
          index = i;
          break;
        }
      }
    }

    return index;
  }

  toggleAll(event, checkbox) {
    if(checkbox.checked) {
      this.value = [];
    }
    else {
      let opts = this.getVisibleOptions();
      if(opts) {
        this.value = [];
        for(let i = 0; i < opts.length; i++) {
          this.value.push(opts[i].value);
        }
      }
    }
    checkbox.checked = !checkbox.checked;
    if(this.onChange){
      this.onChange({originalEvent: event, value: this.value});
    }
    //this.valueChange.emit(this.value);
  }

  isAllChecked() {
    if(this.filterValue && this.filterValue.trim().length)
    return this.value&&this.visibleOptions&&(this.value.length == this.visibleOptions.length);
    else
    return this.value&&this.options&&(this.value.length == this.options.length);
  }

  show() {
    this.panelVisible = true;
    this.panel.style.zIndex = ++PUI.zindex;
    this.domHandler.relativePosition(this.panel, this.container);
    this.domHandler.fadeIn(this.panel, 250);
  }

  hide() {
    this.panelVisible = false;
  }

  close(event) {
    this.hide();
    event.preventDefault();
  }

  onMouseenter(event) {
    this.hover = true;
  }

  onMouseleave(event) {
    this.hover = false;
  }

  onMouseclick(event,input) {
    if(!this.panelClick) {
      if(this.panelVisible) {
        this.hide();
      }
      else {
        input.focus();
        this.show();
      }
    }

    this.selfClick = true;
  }

  onFocus(event) {
    this.focus = true;
  }

  onBlur(event) {
    this.focus = false;
  }

  updateLabel() {
    if(this.value && this.value.length) {
      let label = '';
      for(let i = 0; i < this.value.length; i++) {
        if(i != 0) {
          label = label + ',';
        }
        label = label + this.findLabelByValue(this.value[i]);
      }
      this.valuesAsString = label;
    }
    else {
      this.valuesAsString = this.defaultLabel;
    }
  }

  findLabelByValue(val: any): string {
    let label = null;
    for(let i = 0; i < this.options.length; i++) {
      let option = this.options[i];
      if(option.value == val) {
        label = option.label;
        break;
      }
    }
    return label;
  }

  onFilter(event) {
    this.filterValue = event.target.value.trim().toLowerCase();
    this.visibleOptions = [];
    for(let i = 0; i < this.options.length; i++) {
      let option = this.options[i];
      if(option.label.toLowerCase().startsWith(this.filterValue.toLowerCase())) {
        this.visibleOptions.push(option);
      }
    }
    this.filtered = true;
  }

  isItemVisible(option: SelectItem): boolean {
    if(this.filterValue && this.filterValue.trim().length) {
      for(let i = 0; i < this.visibleOptions.length; i++) {
        if(this.visibleOptions[i].value == option.value) {
          return true;
        }
      }
    }
    else {
      return true;
    }
  }

  getVisibleOptions(): SelectItem[] {
    if(this.filterValue && this.filterValue.trim().length) {
      let items = [];
      for(let i = 0; i < this.options.length; i++) {
        let option = this.options[i];
        if(option.label.toLowerCase().startsWith(this.filterValue.toLowerCase())) {
          items.push(option);
        }
      }
      return items;
    }
    else {
      return this.options;
    }
  }

  detached() {
    this.element.removeEventListener('click',this.documentClickListener);
  }

}
