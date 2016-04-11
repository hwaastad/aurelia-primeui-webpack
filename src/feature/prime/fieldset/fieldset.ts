import {customElement,bindable,autoinject} from 'aurelia-framework';

@customElement('p-fieldset')
export class FieldSetComponent {
  @bindable legend: string;
  @bindable toggleable: boolean;
  @bindable collapsed: boolean = false;
  @bindable onBeforeToggle;
  @bindable onAfterToggle;
  @bindable style: string
  @bindable styleClass: string

  private hover: boolean;

  onLegendMouseenter(event) {
    if(this.toggleable) {
      this.hover = true;
    }
  }

  onLegendMouseleave(event) {
    if(this.toggleable) {
      this.hover = false;
    }
  }

  toggle(event) {
    if(this.toggleable) {
      if(this.onBeforeToggle){
        this.onBeforeToggle({originalEvent: event, collapsed: this.collapsed});
      }
      if(this.collapsed)
      this.expand(event);
      else
      this.collapse(event);
      if(this.onAfterToggle){
        this.onAfterToggle({originalEvent: event, collapsed: this.collapsed});   
      }
    }
  }

  expand(event) {
    this.collapsed = false;
  }

  collapse(event) {
    this.collapsed = true;
  }
}
