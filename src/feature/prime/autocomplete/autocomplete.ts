import {bindable,autoinject,customElement} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@customElement('p-autocomplete')
@autoinject()
export class AutoCompleteComponent {
  @bindable value: any;
  @bindable minLength: number = 3;
  @bindable delay: number = 300;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable inputStyle: string;
  @bindable inputStyleClass: string;
  @bindable placeholder: string;
  @bindable readonly: number;
  @bindable disabled: number;
  @bindable maxlength: number;
  @bindable size: number;
  @bindable suggestions: any[];
  @bindable completeMethod;
  @bindable valueChange;
  @bindable onSelect;
  @bindable onUnselect;
  @bindable onDropdownClick;
  @bindable field: string;
  @bindable scrollHeight: string = '200px';
  @bindable dropdown: boolean;
  @bindable multiple: boolean;

  //@ContentChild(TemplateRef) itemTemplate: TemplateRef;

  timeout: number;

  differ: any;

  panel: any;

  input: any;

  multipleContainer: any;

  panelVisible: boolean = false;

  documentClickListener: any;

  suggestionsUpdated: boolean;

  constructor(private element: Element,private domHandler: DomHandler){

  }

  attached(){
    this.input = this.domHandler.findSingle(this.element, 'input');
    this.panel = this.domHandler.findSingle(this.element, 'div.ui-autocomplete-panel');

    if(this.multiple) {
      this.multipleContainer = this.domHandler.findSingle(this.element, 'ul.ui-autocomplete-multiple');
    }

    /*  this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
    this.hide();
  });*/
}

search(event: any, query: string) {
  if(query === undefined || query === null) {
    return;
  }
  if(this.completeMethod){
    this.completeMethod({originalEvent: event,query: query});
  }
}

onItemMouseover(event) {
  if(this.disabled) {
    return;
  }

  let element = event.target;
  if(element.nodeName != 'UL') {
    let item = this.findListItem(element);
    this.domHandler.addClass(item, 'ui-state-highlight');
  }
}

onItemMouseout(event) {
  if(this.disabled) {
    return;
  }

  let element = event.target;
  if(element.nodeName != 'UL') {
    let item = this.findListItem(element);
    this.domHandler.removeClass(item, 'ui-state-highlight');
  }
}

onItemClick(event) {
  let element = event.target;
  if(element.nodeName != 'UL') {
    let item = this.findListItem(element);
    this.selectItem(item);
  }
}

selectItem(item: any) {
  let itemIndex = this.domHandler.index(item);
  let selectedValue = this.suggestions[itemIndex];

  if(this.multiple) {
    this.input.value = '';
    this.value = this.value||[];
    this.value.push(selectedValue);
    if(this.valueChange){
      this.valueChange(this.value);
    }
  }
  else {
    this.input.value = this.field ? this.resolveFieldData(selectedValue): selectedValue;
    if(this.valueChange){
      this.valueChange(selectedValue);
    }
  }
  if(this.onSelect){
    this.onSelect(selectedValue);
  }
  this.input.focus();
}

findListItem(element) {
  if(element.nodeName == 'LI') {
    return element;
  }
  else {
    let parent = element.parentElement;
    while(parent.nodeName != 'LI') {
      parent = parent.parentElement;
    }
    return parent;
  }
}

show() {
  if(!this.panelVisible) {
    this.panelVisible = true;
    this.panel.style.zIndex = ++PUI.zindex;
    this.domHandler.fadeIn(this.panel, 200);
  }
}

align() {
  if(this.multiple)
  this.domHandler.relativePosition(this.panel, this.multipleContainer);
  else
  this.domHandler.relativePosition(this.panel, this.input);
}

hide() {
  this.panelVisible = false;
}

handleDropdownClick(event) {
  if(this.onDropdownClick){
    this.onDropdownClick({originalEvent: event,query: this.input.value});
  }
}

removeItem(item: any) {
  let itemIndex = this.domHandler.index(item);
  this.onUnselect.emit(this.suggestions[itemIndex]);
  this.value.splice(itemIndex, 1);
}

resolveFieldData(data: any): any {
  if(data && this.field) {
    if(this.field.indexOf('.') == -1) {
      return data[this.field];
    }
    else {
      let fields: string[] = this.field.split('.');
      let value = data;
      for(var i = 0, len = fields.length; i < len; ++i) {
        value = value[fields[i]];
      }
      return value;
    }
  }
  else {
    return null;
  }
}

onKeydown(event) {
  if(this.panelVisible) {
    let highlightedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');

    switch(event.which) {
      //down
      case 40:
      if(highlightedItem) {
        var nextItem = highlightedItem.nextSibling;
        if(nextItem) {
          this.domHandler.removeClass(highlightedItem, 'ui-state-highlight');
          this.domHandler.addClass(nextItem, 'ui-state-highlight');
          this.domHandler.scrollInView(this.panel, nextItem);
        }
      }
      else {
        let firstItem = this.domHandler.findSingle(this.panel, 'li:first-child');
        this.domHandler.addClass(firstItem, 'ui-state-highlight');
      }

      event.preventDefault();
      break;

      //up
      case 38:
      if(highlightedItem) {
        var prevItem = highlightedItem.previousElementSibling;
        if(prevItem) {
          this.domHandler.removeClass(highlightedItem, 'ui-state-highlight');
          this.domHandler.addClass(prevItem, 'ui-state-highlight');
          this.domHandler.scrollInView(this.panel, prevItem);
        }
      }

      event.preventDefault();
      break;

      //enter
      case 13:
      this.selectItem(highlightedItem);
      this.hide();
      event.preventDefault();
      break;

      //enter
      case 27:
      this.hide();
      event.preventDefault();
      break;

      //tab
      case 9:
      this.selectItem(highlightedItem);
      this.hide();
      break;
    }
  }
}

ngOnDestroy() {
  if(this.documentClickListener) {
    this.documentClickListener();
  }
}
}
