import {autoinject,bindable,customElement} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';
import {SelectItem} from '../api/selectitem';

@customElement('p-listbox')
@autoinject()
export class ListBoxComponent {
  @bindable options: SelectItem[];
  @bindable multiple: boolean;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable disabled: string;
  @bindable valueChange;
  @bindable onChange;

  _value: any;
  valueChanged: boolean;

  constructor(private element:Element,private domHandler:DomHandler){

  }

  get value(){
    return this._value;
  }

  set value(val:any){
    this._value = val;
    if(!this.multiple) {
      this.valueChanged = true;
    }
  }

  preselect() {
    let items = this.domHandler.find(this.element, 'li.ui-listbox-item');
    if(items && items.length) {
      this.unselectAll(items);

      if(this.value) {
        if(this.multiple) {
          for(let i = 0; i < this.value.length; i++) {
            for(let j = 0; i < this.options.length; j++) {
              if(this.options[j].value == this.value[i]) {
                this.domHandler.addClass(items[j], 'ui-state-highlight');
                break;
              }
            }
          }
        }
        else {
          for(let i = 0; i < this.options.length; i++) {
            if(this.options[i].value == this.value) {
              this.domHandler.addClass(items[i], 'ui-state-highlight');
              break;
            }
          }
        }
      }
    }
  }

  unselectAll(items: NodeList[]) {
    let listItems = items||this.domHandler.find(this.element, 'li.ui-listbox-item');
    for(let i = 0; i < listItems.length; i++) {
      this.domHandler.removeClass(listItems[i], 'ui-state-highlight');
    }
  }

  onMouseover(event) {
    if(this.disabled) {
      return;
    }

    let element = event.target;
    if(element.nodeName != 'UL') {
      let item = this.findListItem(element);
      this.domHandler.addClass(item, 'ui-state-hover');
    }
  }

  onMouseout(event) {
    if(this.disabled) {
      return;
    }

    let element = event.target;
    if(element.nodeName != 'UL') {
      let item = this.findListItem(element);
      this.domHandler.removeClass(item, 'ui-state-hover');
    }
  }

  onClick(event) {
    if(this.disabled) {
      return;
    }

    let element = event.target;
    if(element.nodeName != 'UL') {
      let item = this.findListItem(element);
      this.onItemClick(event,item);
    }
  }

  onItemClick(event, item) {
    let metaKey = (event.metaKey||event.ctrlKey);

    if(this.domHandler.hasClass(item, 'ui-state-highlight')) {
      if(metaKey)
      this.domHandler.removeClass(item, 'ui-state-highlight');
      else
      this.unselectSiblings(item);
    }
    else {
      if(!metaKey||!this.multiple) {
        this.unselectSiblings(item);
      }

      this.domHandler.removeClass(item, 'ui-state-hover');
      this.domHandler.addClass(item, 'ui-state-highlight');
    }

    //update value
    if(this.multiple) {
      let selectedItems = this.domHandler.find(item.parentNode, 'li.ui-state-highlight');
      let valueArr = [];
      if(selectedItems && selectedItems.length) {
        for(let i = 0; i < selectedItems.length; i++) {
          let itemIndex = this.domHandler.index(selectedItems[i]);
          valueArr.push(this.options[itemIndex].value);
        }
      }
      if(this.valueChange){
        this.valueChange(valueArr);
      }
    }
    else {
      let selectedItem = this.domHandler.findSingle(item.parentNode, 'li.ui-state-highlight');
      if(selectedItem) {
        let selectedIndex = this.domHandler.index(selectedItem);
        if(this.valueChange){
          this.valueChange(this.options[selectedIndex].value);
        }
      }
      else {
        if(this.valueChange){
          this.valueChange(null);
        }
      }
    }
  }

  unselectSiblings(item) {
    let siblings = this.domHandler.siblings(item);
    for(let i = 0; i < siblings.length; i++) {
      let sibling = siblings[i];
      if(this.domHandler.hasClass(sibling, 'ui-state-highlight')) {
        this.domHandler.removeClass(sibling, 'ui-state-highlight');
      }
    }
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
}
