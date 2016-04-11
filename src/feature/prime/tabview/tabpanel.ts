import {bindable,customElement} from 'aurelia-framework';

@customElement('p-tabpanel')
export class TabPanel {
  @bindable header: string;
  @bindable selected: boolean;
  @bindable disabled: boolean;
  @bindable closable: boolean;
  @bindable headerStyle: string;
  @bindable headerStyleClass: string;

  public hoverHeader: boolean;

  public closed: boolean;

}
