import {bindable,autoinject,customElement,LogManager} from 'aurelia-framework';

@customElement('p-panelmenu')
@autoinject
export class PanelMenuComponent {
  @bindable style: string;
  @bindable styleClass: string;

  initialized: boolean;
  menuElement: any;

  constructor(private element: Element) {
    this.initialized = false;
  }

  attached() {
    this.menuElement = jQuery(this.element).children('div');
    this.menuElement.puipanelmenu({
      enhanced: true
    });
    this.initialized = true;
  }

  propertyChanged(property,newVal,oldVal) {
    if (this.initialized) {
      this.menuElement.puipanelmenu('option', property, newVal);
    }
  }

  detached() {
    this.menuElement.puipanelmenu('destroy');
    this.initialized = false;
    this.menuElement = null;
  }

}
