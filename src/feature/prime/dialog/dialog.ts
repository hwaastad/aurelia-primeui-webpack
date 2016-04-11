import {bindable,customElement,autoinject} from 'aurelia-framework';

@customElement('p-dialog')
@autoinject
export class DialogComponent {

  @bindable header: string;
  @bindable draggable: boolean = true;
  @bindable resizable: boolean = true;
  @bindable minWidth: number;
  @bindable minHeight: number;
  @bindable width: any;
  @bindable height: any;
  @bindable visible: boolean;
  @bindable modal: boolean;
  @bindable showEffect: string;
  @bindable hideEffect: string;
  @bindable effectDuration: any;
  @bindable closeOnEscape: boolean = true;
  @bindable rtl: boolean;
  @bindable closable: boolean = true;
  @bindable minimizable: boolean;
  @bindable maximizable: boolean;
  @bindable responsive: boolean;

  @bindable onBeforeShow;
  @bindable onAfterShow;
  @bindable onBeforeHide;
  @bindable onAfterHide;
  @bindable onMinimize;
  @bindable onMaximize;

  initialized: boolean;

  stopNgOnChangesPropagation: boolean;
  constructor(private element:Element){

  }

  propertyChanged(property,newVal,oldVal){
    if(this.initialized){
      if (property == 'visible' && this.stopNgOnChangesPropagation) {
        this.stopNgOnChangesPropagation = false;
        return;
      }
      jQuery((<HTMLElement>this.element).children[0]).puidialog('option', property, newVal);
    }
  }

  attached(){
    jQuery((<HTMLElement>this.element).children[0]).puidialog({
      title: this.header,
      draggable: this.draggable,
      resizable: this.resizable,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      width: this.width,
      height: this.height,
      visible: this.visible,
      modal: this.modal,
      showEffect: this.showEffect,
      hideEffect: this.hideEffect,
      effectSpeed: this.effectDuration,
      closeOnEscape: this.closeOnEscape,
      rtl: this.rtl,
      closable: this.closable,
      minimizable: this.minimizable,
      maximizable: this.maximizable,
      responsive: this.responsive,
      beforeShow: this.onBeforeShow ? (event: Event) => { this.onBeforeShow(event); } : null,
      afterShow: this.onAfterShow ? (event: Event) => { this.onAfterShow(event); } : null,
      beforeHide: this.onBeforeHide ? (event: Event) => { this.onBeforeHide(event); } : null,
      afterHide: this.onAfterHide ? (event: Event) => { this.onAfterHide(event); } : null,
      clickClose: (event: Event) => {
        this.stopNgOnChangesPropagation = true;
        this.visible=false;
      },
      hideWithEscape: (event: Event) => {
        this.stopNgOnChangesPropagation = true;

        this.visible=false;
      },
      minimize: this.onMinimize ? (event: Event) => { this.onMinimize(event); } : null,
      maximize: this.onMaximize ? (event: Event) => { this.onMaximize(event); } : null,
      enhanced: true
    });
    this.initialized = true;
  }

  detached(){
    jQuery((<HTMLElement>this.element).children[0]).puidialog('destroy');
    this.initialized = false;
  }
}
