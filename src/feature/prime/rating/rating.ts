import {autoinject,bindable,customElement} from 'aurelia-framework';

@customElement('p-rating')
@autoinject
export class RatingComponent {
  @bindable value: number;
  @bindable disabled: boolean;
  @bindable readonly: boolean;
  @bindable stars: number = 5;
  @bindable cancel: boolean = true;
  @bindable onRate;
  @bindable onCancel;

  private starsArray: number[];
  private hoverCancel: boolean;

  constructor(private element:Element){
    this.starsArray = [];
    for(let i = 0; i < this.stars; i++) {
      this.starsArray[i] = i;
    }
  }

  rate(event, i: number): void {
    if(!this.readonly&&!this.disabled) {
      this.value=i+1;
      if(this.onRate){
        this.onRate({
          originalEvent: event,
          value: (i+1)
        });
      }
    }
  }

  clear(event): void {
    if(!this.readonly&&!this.disabled) {
      this.value=undefined;
      if(this.onCancel){
        this.onCancel(event);
      }
    }
  }
}
