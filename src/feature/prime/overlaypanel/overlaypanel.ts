import {autoinject,bindable,customElement} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@customElement('p-overlaypanel')
@autoinject
export class OverlayPanelComponent {
  @bindable dismissable: boolean = true;
  @bindable showCloseIcon: boolean;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable onBeforeShow;
  @bindable onAfterShow;
  @bindable onBeforeHide;
  @bindable onAfterHide;

  visible: boolean = false;
  hoverCloseIcon: boolean;
  documentClickListener: any;
  selfClick: boolean;
  targetEvent: boolean;
  target: any;

  constructor(private element:Element,private domHandler:DomHandler){
    this.documentClickListener = e => {
      console.log('click...');
      if(!this.selfClick&&!this.targetEvent) {
        this.hide();
      }
      this.selfClick = false;
      this.targetEvent = false;
    }
  }

  attached(){
    if(this.dismissable) {
      this.element.addEventListener('click', this.documentClickListener);
    }
  }

  detached(){
    if(this.dismissable) {
      this.element.removeEventListener('click',this.documentClickListener);
    }

    this.target = null;
  }

  toggle(event,target?) {
    let currentTarget = (target||event.currentTarget||event.target);

    if(!this.target||this.target == currentTarget) {
      if(this.visible)
      this.hide();
      else
      this.show(event, target);
    }
    else {
      this.show(event, target);
    }

    if(this.dismissable) {
      this.targetEvent = true;
    }

    this.target = currentTarget;
  }

  show(event,target?) {
    if(this.dismissable) {
      this.targetEvent = true;
    }
    if(this.onBeforeShow){
      this.onBeforeShow(null);
    }
    let elementTarget = target||event.currentTarget||event.target;
    let container:any = this.element.firstElementChild;
    container.style.zIndex = ++PUI.zindex;

    if(this.visible) {
      this.domHandler.absolutePosition(container, elementTarget);
    }
    else {
      this.visible = true;
      this.domHandler.absolutePosition(container, elementTarget);
      this.domHandler.fadeIn(container, 250);
    }
    if(this.onAfterShow){
      this.onAfterShow(null);
    }
  }

  hide() {
    if(this.visible) {
      if(this.onBeforeHide){
        this.onBeforeHide(null);
      }
      this.visible = false;
      if(this.onAfterHide){
        this.onAfterHide(null);
      }
    }
  }

  onPanelClick() {
    if(this.dismissable) {
      this.selfClick = true;
    }
  }

  onCloseClick(event) {
    this.hide();

    if(this.dismissable) {
      this.selfClick = true;
    }

    event.preventDefault();
  }

}
