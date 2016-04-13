import {autoinject,bindable,customElement} from 'aurelia-framework';

@customElement('p-slidemenu')
@autoinject
export class SlidemenuComponent {
  @bindable popup: boolean;
  @bindable trigger: any;
  @bindable my: string;
  @bindable at: string;
  @bindable triggerEvent: string;
  @bindable backLabel: string = 'Back';
  @bindable style: string;
  @bindable styleClass: string;

  initialized: boolean;
  menuElement: any;

  constructor(private element: Element) {
    this.initialized = false;
  }

  attached() {
    this.menuElement = jQuery(this.element).find('> div > div > div > ul');
    this.menuElement.puislidemenu({
      enhanced: true,
      popup: this.popup,
      trigger: this.trigger ? jQuery(this.trigger): null,
      my: this.my,
      at: this.at,
      triggerEvent: this.triggerEvent
    });
    this.initialized = true;
  }

  propertyChanged(property,newVal,oldVal) {
    if (this.initialized) {
      this.menuElement.puislidemenu('option', property,newVal);
    }
  }

  detached() {
    this.menuElement.puislidemenu('destroy');
    this.initialized = false;
    this.menuElement = null;
  }

}
