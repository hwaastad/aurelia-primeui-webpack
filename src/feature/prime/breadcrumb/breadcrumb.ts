import {bindable,autoinject,customElement,LogManager} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../api/menumodel';

@customElement('p-breadcrumb')
@autoinject
export class BreadCrumbComponent {
  @bindable style: string;
  @bindable styleClass: string;
  @bindable model: MenuItem[];

  constructor(private element:Element){}

  itemClick(event, item: MenuItem) {
    if(item.eventEmitter){
      item.eventEmitter(event);
    }
  }

}
