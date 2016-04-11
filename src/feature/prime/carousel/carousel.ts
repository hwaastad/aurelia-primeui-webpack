import {bindable,autoinject,customElement} from 'aurelia-framework';

@customElement('p-carousel')
@autoinject
export class CarouselComponent {
  @bindable value: any[];
  @bindable numVisible: number = undefined;
  @bindable firstVisible: number;
  @bindable headerText: string;
  @bindable effectDuration: any;
  @bindable circular: boolean;
  @bindable breakpoint: number;
  @bindable responsive: boolean=undefined;
  @bindable autoplayInterval: number;
  @bindable easing: string;
  @bindable pageLinks: number;
  @bindable style: string;
  @bindable styleClass: string;

  //@ContentChild(TemplateRef) itemTemplate: TemplateRef;

  initialized: boolean;

  carouselElement: any;

  constructor(private el:Element){
    this.initialized = false;
  }

  attached(){
    this.carouselElement = jQuery(this.el).find('> .ui-carousel > .ui-carousel-viewport > ul');
    this.carouselElement.puicarousel({
      numVisible: this.numVisible,
      firstVisible: this.firstVisible,
      headerText: this.headerText,
      effectDuration: this.effectDuration,
      circular: this.circular,
      breakpoint: this.breakpoint,
      responsive: this.responsive,
      autoplayInterval: this.autoplayInterval,
      easing: this.easing,
      pageLinks: this.pageLinks,
      style: this.style,
      styleClass: this.styleClass,
      enhanced: true
    });
    this.initialized = true;
  }

  propertyChanged(property,newVal,oldVal){
    if(this.initialized){
      this.carouselElement.puicarousel('option', property, newVal);
    }
  }

  detached(){
    this.carouselElement.puicarousel('destroy');
    this.initialized = false;
    this.carouselElement = null;
  }
}
