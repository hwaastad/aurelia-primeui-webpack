import {autoinject,customElement,bindable} from 'aurelia-framework';
import {SelectItem} from '../api/selectitem';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@customElement('p-dropdown')
@autoinject()
export class DropDownComponent {
  @bindable value;
  @bindable options: SelectItem[];
  @bindable onChange;
  @bindable scrollHeight: string = '200px';
  @bindable filter: boolean;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable disabled: boolean;

  optionsToDisplay: SelectItem[];
  label: string;
  hover: boolean;
  focus: boolean;
  differ: any;
  private panelVisible: boolean = false;
  private viewstateChanged: boolean;
  private panel: any;
  private container: any;
  private itemsWrapper: any;
  private initialized: boolean;
  private handleBodyClick:any;

  constructor(private element:Element,private domHandler:DomHandler){
    this.handleBodyClick = e => {
      if(this.panelVisible==true){
        this.panelVisible=false;
      }
    }
  }

  bind(){
    if(this.options) {
      let selectedIndex = this.findItemIndex(this.value, this.options);
      if(selectedIndex == -1)
      this.label = this.options[0].label;
      else
      this.label = this.options[selectedIndex].label;
    }
    else {
      this.label = '&nbsp;';
    }

    this.optionsToDisplay = this.options;
  }

  attached(){
    let items = this.domHandler.find(this.element, '.ui-dropdown-items > li');
    let selectedIndex = this.findItemIndex(this.value, this.options);
    if(this.options) {
      if(selectedIndex == -1) {
        selectedIndex = 0;
      }
      this.domHandler.addClass(items[selectedIndex], 'ui-state-highlight');
    }

    this.container = (<HTMLElement>this.element).children[0];
    this.panel = this.domHandler.findSingle(this.element, 'div.ui-dropdown-panel');
    this.itemsWrapper = this.domHandler.findSingle(this.element, 'div.ui-dropdown-items-wrapper');

    this.updateDimensions();
    document.addEventListener('click', this.handleBodyClick);
    this.initialized = true;
  }

  detached(){
    document.removeEventListener('click', this.handleBodyClick);
    this.initialized = false;
  }

  updateUI() {
    let items = this.domHandler.find(this.element, '.ui-dropdown-items > li');
    let currentSelectedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
    if(currentSelectedItem) {
      this.domHandler.removeClass(currentSelectedItem, 'ui-state-highlight');
    }

    if(this.optionsToDisplay) {
      let selectedIndex = this.findItemIndex(this.value, this.optionsToDisplay);
      if(selectedIndex != -1) {
        this.label = this.optionsToDisplay[selectedIndex].label;
        this.domHandler.addClass(items[selectedIndex], 'ui-state-highlight');
      }
    }
    else {
      this.label = '&nbsp;';
    }
  }

  updateDimensions() {
    let select = this.domHandler.findSingle(this.element, 'select');
    if(!this.style||this.style.indexOf('width') == -1) {
      (<HTMLElement>this.element.firstElementChild).style.width = select.offsetWidth + 20 + 'px';
    }

    this.panel.style.width = '100%';
  }

  onMouseenter(event) {
    this.hover = true;
  }

  onMouseleave(event) {
    this.hover = false
  }

  onMouseclick(event,input) {
    console.dir(event);
    console.log('input: '+input);
    if(!this.panelVisible) {
      input.focus();
      this.show(this.panel,this.container);
      event.stopPropagation();
    }
    return false;
  }

  show(panel,container) {
    this.panelVisible = true;
    panel.style.zIndex = ++PUI.zindex;
    this.domHandler.relativePosition(panel, container);
    this.domHandler.fadeIn(panel,250);
  }

  hide() {
    this.panelVisible = false;
  }

  onFocus(event) {
    this.focus = true;
  }

  onBlur(event) {
    this.focus = false;
  }

  onKeydown(event) {
    let highlightedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
    switch(event.which) {
      //down
      case 40:
      if(!this.panelVisible && event.altKey) {
        this.show(this.panel, this.container);
      }
      else {
        if(highlightedItem) {
          var nextItem = highlightedItem.nextElementSibling;
          if(nextItem) {
            this.selectItem(event, nextItem);
            this.domHandler.scrollInView(this.itemsWrapper, nextItem);
          }
        }
        else {
          let firstItem = this.domHandler.findSingle(this.panel, 'li:first-child');
          this.selectItem(event, firstItem);
        }
      }

      event.preventDefault();

      break;

      //up
      case 38:
      if(highlightedItem) {
        var prevItem = highlightedItem.previousElementSibling;
        if(prevItem) {
          this.selectItem(event, prevItem);
          this.domHandler.scrollInView(this.itemsWrapper, prevItem);
        }
      }

      event.preventDefault();
      break;

      //enter
      case 13:
      this.panelVisible = false;
      event.preventDefault();
      break;

      //escape and tab
      case 27:
      case 9:
      this.panelVisible = false;
      break;
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

  onListMouseover(event) {
    if(this.disabled) {
      return;
    }

    let element = event.target;
    if(element.nodeName != 'UL') {
      let item = this.findListItem(element);
      this.domHandler.addClass(item, 'ui-state-hover');
    }
  }

  onListMouseout(event) {
    if(this.disabled) {
      return;
    }

    let element = event.target;
    if(element.nodeName != 'UL') {
      let item = this.findListItem(element);
      this.domHandler.removeClass(item, 'ui-state-hover');
    }
  }

  onListClick(event) {
    console.log('list click');
    if(this.disabled) {
      return;
    }

    let element = event.target;
    if(element.nodeName != 'UL') {
      let item = this.findListItem(element);
      this.selectItem(event,item);
    }
    this.panelVisible=false;
  }

  selectItem(event, item) {
    let currentSelectedItem = this.domHandler.findSingle(item.parentNode, 'li.ui-state-highlight');
    if(currentSelectedItem != item) {
      if(currentSelectedItem) {
        this.domHandler.removeClass(currentSelectedItem, 'ui-state-highlight');
      }
      this.domHandler.addClass(item, 'ui-state-highlight');
      let selectedOption = this.options[this.findItemIndex(item.dataset.value, this.options)];
      this.label = selectedOption.label;
      this.value = selectedOption.value;
      if(this.onChange){
        this.onChange(event);
      }
    }
  }

  findItemIndex(val: any, opts: SelectItem[]): number {
    let index = -1;
    if(opts) {
      if(val !== null && val !== undefined) {
        for(let i = 0; i < opts.length; i++) {
          if(opts[i].value == val) {
            index = i;
            break;
          }
        }
      }
    }
    return index;
  }

  onFilter(event): void {
    if(this.options && this.options.length) {
      let val = event.target.value.toLowerCase();
      this.optionsToDisplay = [];
      for(let i = 0; i < this.options.length; i++) {
        let option = this.options[i];
        if(option.label.toLowerCase().startsWith(val)) {
          this.optionsToDisplay.push(option);
        }
      }
      this.viewstateChanged = true;
    }
  }

  valueChanged(newVal,oldVal){
    console.log('value changed....');
    this.updateUI();
  }

}
