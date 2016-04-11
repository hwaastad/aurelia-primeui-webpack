import {bindable,customElement} from 'aurelia-framework';
import {Header} from '../common/header';
import {Footer} from '../common/footer';

@customElement('p-column')
export class Column {
  @bindable field: string;
  @bindable header: string;
  @bindable footer: string;
  @bindable sortable: boolean;
  @bindable editable: boolean;
  @bindable filter: boolean;
  @bindable filterMatchMode: string;
  @bindable rowspan: number;
  @bindable colspan: number;
  @bindable style: string;
  @bindable styleClass: string;
  //@ContentChild(TemplateRef) template: TemplateRef;
}
