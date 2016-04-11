import {autoinject,bindable,customElement} from 'aurelia-framework';
import {AccordionComponent} from './accordion';

@customElement('p-accordiontab')
@autoinject
export class AccordionTab {
  @bindable header: string;

  @bindable selected: boolean;

  @bindable disabled: boolean;

  constructor(private element:Element,private accordion:AccordionComponent){
    this.accordion.addTab(this);
  }

  toggle(event) {
    if(this.disabled) {
      event.preventDefault();
      return;
    }

    let index = this.findTabIndex();

    if(this.selected) {
      this.selected = !this.selected;
      if(this.accordion.onClose){
        this.accordion.onClose({originalEvent: event, index: index});
      }
    }
    else {
      if(!this.accordion.multiple) {
        for(var i = 0; i < this.accordion.tabs.length; i++) {
          this.accordion.tabs[i].selected = false;
        }
      }

      this.selected = true;
      if(this.accordion.onOpen){
        this.accordion.onOpen({originalEvent: event, index: index});
      }
    }

    event.preventDefault();
  }

  findTabIndex() {
    let index = -1;
    for(var i = 0; i < this.accordion.tabs.length; i++) {
      if(this.accordion.tabs[i] == this) {
        index = i;
        break;
      }
    }
    return index;
  }
}
