import {autoinject,bindable,customElement} from 'aurelia-framework';

@customElement('p-galleria')
@autoinject
export class GalleriaComponent {
  @bindable panelWidth: number;
  @bindable panelHeight: number;
  @bindable frameWidth: number;
  @bindable activeIndex: number;
  @bindable showFilmstrip: boolean = true;
  @bindable autoPlay: boolean = true;
  @bindable transitionInterval: number;
  @bindable effect: string;
  @bindable effectDuration: any;
  @bindable showCaption: boolean = true;
  @bindable customContent: boolean;

  initialized: boolean;

  constructor(private element: Element) {
    this.initialized = false;
  }

  attached() {
    jQuery((<HTMLElement>this.element).children[0]).puigalleria({
      panelWidth: this.panelWidth,
      panelHeight: this.panelHeight,
      frameWidth: this.frameWidth,
      activeIndex: this.activeIndex,
      showFilmstrip: this.showFilmstrip,
      autoPlay: this.autoPlay,
      transitionInterval: this.transitionInterval,
      effect: this.effect,
      effectSpeed: this.effectDuration,
      showCaption: this.showCaption,
      customContent: this.customContent
    });
    this.initialized = true;
  }

  propertyChanged(property,newVal,oldVal) {
    if (this.initialized) {
        jQuery((<HTMLElement>this.element).children[0]).puigalleria('option', property,newVal);
    }
  }

  detached() {
    jQuery((<HTMLElement>this.element).children[0]).puigalleria('destroy');
    this.initialized = false;
  }

}
