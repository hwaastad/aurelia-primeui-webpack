import {bindable,autoinject,customElement} from 'aurelia-framework';
import {AccordionTab} from './accordiontab';

@customElement('p-accordion')
@autoinject
export class AccordionComponent {
  @bindable multiple: boolean;
  @bindable onClose;
  @bindable onOpen;
  @bindable style: string;
  @bindable styleClass: string;
  public tabs: AccordionTab[] = [];

  constructor(private element: Element) {}

  addTab(tab: AccordionTab) {
    this.tabs.push(tab);
  }
}
