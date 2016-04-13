import {autoinject,bindable,customElement} from 'aurelia-framework';

@customElement('p-menubar')
@autoinject
export class MenuBarComponent {
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
    this.menuElement.puimenubar({
      enhanced: true,
      autoDisplay: this.autoDisplay
    });
    this.initialized = true;
  }

  propertyChanged(property,newVal,oldVal) {
    if (this.initialized) {
        this.menuElement.puimenubar('option', property, newVal);
    }
  }

  detached() {
    this.menuElement.puimenubar('destroy');
    this.initialized = false;
    this.menuElement = null;
  }

}
