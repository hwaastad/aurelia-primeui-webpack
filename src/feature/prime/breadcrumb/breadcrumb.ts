import {bindable,autoinject,customElement,LogManager} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

@customElement('p-breadcrumb')
@autoinject
export class BreadCrumbComponent {
  @bindable style: string;
  @bindable styleClass: string;

  initialized: boolean;
  menuElement: any;

  constructor(private element:Element){
    this.initialized=false;
  }

  attached(){
    this.menuElement = jQuery(this.element).find('> div > ul');
    this.menuElement.puibreadcrumb({
      enhanced: true
    });
    this.initialized = true;
  }

  propertyChanged(property,newVal,oldVal){
    if (this.initialized) {
      this.menuElement.puibreadcrumb('option', property,newVal);
    }
  }

  detached(){
    this.menuElement.puibreadcrumb('destroy');
    this.initialized = false;
    this.menuElement = null;
  }

}
