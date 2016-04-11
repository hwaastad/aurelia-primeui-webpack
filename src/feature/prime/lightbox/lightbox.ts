import {autoinject,customElement} from 'aurelia-framework';

@customElement('p-lightbox')
@autoinject
export class LighBoxComponent {
  initialized: boolean;

  constructor(private element:Element){
    this.initialized=false;
  }

  attached(){
    jQuery((<HTMLElement>this.element).children[0]).puilightbox();
    this.initialized = true;
  }

  detached() {
    jQuery((<HTMLElement>this.element).children[0]).puilightbox('destroy');
    this.initialized = false;
  }
}
