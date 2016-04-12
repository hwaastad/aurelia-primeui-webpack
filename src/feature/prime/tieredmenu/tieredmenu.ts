import {autoinject,bindable,customElement} from 'aurelia-framework';

@customElement('p-tieredmenu')
@autoinject
export class TieredMenuComponent {
  @bindable popup: boolean;
  @bindable trigger: any;
  @bindable my: string;
  @bindable at: string;
  @bindable triggerEvent: string;
  @bindable autoDisplay: boolean;
  @bindable style: string;
  @bindable styleClass: string;

  initialized: boolean;
  menuElement: any;

  constructor(private element: Element) {
    this.initialized = false;
  }

  attached() {
    this.menuElement = jQuery(this.element).find('> div > ul');
    this.menuElement.puitieredmenu({
      enhanced: true,
      popup: this.popup,
      trigger: this.trigger ? jQuery(this.trigger): null,
      my: this.my,
      at: this.at,
      autoDisplay: this.autoDisplay,
      triggerEvent: this.triggerEvent
    });
    this.initialized = true;
  }

  peropertyChanged(property,newVal,oldVal) {
    if (this.initialized) {
      this.menuElement.puitieredmenu('option', property, newVal);
    }
  }

  detached() {
    this.menuElement.puitieredmenu('destroy');
    this.initialized = false;
    this.menuElement = null;
  }

}
