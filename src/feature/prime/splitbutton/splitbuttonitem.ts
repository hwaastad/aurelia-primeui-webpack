import {autoinject, bindable, customElement, noView} from 'aurelia-framework';
//@noView
@customElement('p-splitbuttonitem')
@autoinject()
export class SplitButtonItem {
  @bindable icon: string;
  @bindable label: string;
  @bindable url: any;
  @bindable onClick;

  constructor(private element: Element) {

  }

  getItemUrl(url): string {
    console.log('getting item url....' + url);
    return '#';
  }

  onItemClick(event,item: SplitButtonItem) {
    //item.onClick.emit(event);

    if(!this.url) {
      //event.preventDefault();
    }
    return true;
  }
}
