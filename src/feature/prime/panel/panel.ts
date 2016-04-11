import {autoinject,bindable,customElement} from 'aurelia-framework';

@customElement('p-panel')
@autoinject
export class PanelComponent {
  @bindable toggleable: boolean;
  @bindable header: string;
  @bindable collapsed: boolean = false;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable onBeforeToggle;
  @bindable onAfterToggle;

  toggle(event) {
    if(this.onBeforeToggle){
      this.onBeforeToggle({originalEvent: event, collapsed: this.collapsed});
    }
    if(this.toggleable) {
      if(this.collapsed)
      this.expand(event);
      else
      this.collapse(event);
    }
    if(this.onAfterToggle){
      this.onAfterToggle({originalEvent: event, collapsed: this.collapsed});
    }
    event.preventDefault();
  }

  expand(event) {
    this.collapsed = false;
  }

  collapse(event) {
    this.collapsed = true;
  }
}
