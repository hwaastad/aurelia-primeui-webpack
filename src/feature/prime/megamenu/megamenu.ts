import {autoinject,bindable,customElement} from 'aurelia-framework';

@customElement('p-megamenu')
@autoinject
export class MegaMenuComponent {
  @bindable autoDisplay: boolean;
  @bindable orientation: string;
  @bindable style: string;
  @bindable styleClass: string;

  initialized: boolean;

  menuElement: any;

  constructor(private element: Element) {
    this.initialized = false;
  }

  attached() {
    this.menuElement = jQuery(this.element).children('div');
    this.menuElement.puimegamenu({
      enhanced: true,
      autoDisplay: this.autoDisplay,
      orientation: this.orientation
    });
    this.initialized = true;
  }

  propertyChanged(property,newVal,oldVal) {
    if (this.initialized) {
        this.menuElement.puimegamenu('option', property,newVal);
    }
  }

  detached() {
    this.menuElement.puimegamenu('destroy');
    this.initialized = false;
    this.menuElement = null;
  }
}
