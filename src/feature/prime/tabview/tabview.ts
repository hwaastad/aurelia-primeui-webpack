import {customElement,bindable,autoinject} from 'aurelia-framework';
import {TabPanel} from './tabpanel';

@customElement('p-tabview')
@autoinject
export class TabView {
  @bindable orientation: string = 'top';
  @bindable style: string;
  @bindable styleClass: string;
  @bindable onChange;
  @bindable onClose;

  initialized: boolean;

  tabs: TabPanel[];

  constructor(private element:Element){

  }

  attached(){
    let temp = this.element.querySelectorAll('p-tabpanel');
    //this.tabs = temp.toArray();
    console.dir(this.tabs);
  }

  /*constructor(private element: Element,@Query(TabPanel) tabPanels: QueryList<TabPanel>) {
  tabPanels.changes.subscribe(_ => {
  this.tabs = tabPanels.toArray();
  let selectedTab: TabPanel = this.findSelectedTab();
  if(!selectedTab && this.tabs.length) {
  this.tabs[0].selected = true;
}
});
}*/

open(event, tab: TabPanel) {
  if(tab.disabled) {
    event.preventDefault();
    return;
  }

  if(!tab.selected) {
    let selectedTab: TabPanel = this.findSelectedTab();
    if(selectedTab) {
      selectedTab.selected = false
    }
    tab.selected = true;
    if(this.onChange){
      this.onChange({originalEvent: event, index: this.findTabIndex(tab)});
    }
  }
  event.preventDefault();
}

close(event, tab: TabPanel) {
  if(tab.selected) {
    tab.selected = false;
    for(let i = 0; i < this.tabs.length; i++) {
      let tabPanel = this.tabs[i];
      if(!tabPanel.closed&&!tab.disabled) {
        tabPanel.selected = true;
        break;
      }
    }
  }

  tab.closed = true;
  if(this.onClose){
    this.onClose({originalEvent: event, index: this.findTabIndex(tab)});
  }
  event.stopPropagation();
}

findSelectedTab() {
  for(let i = 0; i < this.tabs.length; i++) {
    if(this.tabs[i].selected) {
      return this.tabs[i];
    }
  }
  return null;
}

findTabIndex(tab: TabPanel) {
  let index = -1;
  for(let i = 0; i < this.tabs.length; i++) {
    if(this.tabs[i] == tab) {
      index = i;
      break;
    }
  }
  return index;
}

getDefaultHeaderClass(tab:TabPanel) {
  let styleClass = 'ui-state-default ui-corner-' + this.orientation;
  if(tab.headerStyleClass) {
    styleClass = styleClass + " " + tab.headerStyleClass;
  }
  return styleClass;
}

}
