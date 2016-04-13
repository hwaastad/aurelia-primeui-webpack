import {bindable,customElement,autoinject} from 'aurelia-framework';

@customElement('p-progressbar')
@autoinject
export class ProgressBarComponent {
  @bindable value: any;
}
