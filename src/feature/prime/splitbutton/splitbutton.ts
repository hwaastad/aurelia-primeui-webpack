import {bindable,customElement,autoinject,children} from 'aurelia-framework';
import {SplitButtonItem} from './splitbuttonitem';
import {DomHandler} from '../dom/domhandler';

@customElement('p-splitbutton')
@autoinject()
export class SplitButtonComponent {
  @bindable icon: string;
  @bindable iconPos: string = 'left';
  @bindable label: string;
  @bindable onClick;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable menuStyle: string;
  @bindable menuStyleClass: string;
  @bindable items: SplitButtonItem[];
  //@ContentChildren(SplitButtonItem) items : QueryList<SplitButtonItem>;
  private hoverDefaultBtn: boolean;
  private focusDefaultBtn: boolean;
  private activeDefaultBtn: boolean;
  private hoverDropdown: boolean;
  private focusDropdown: boolean;
  private activeDropdown: boolean;
  private hoveredItem: any;
  private menuVisible: boolean = false;
  private documentClickListener: any;

  constructor(private element:Element,private domHandler: DomHandler){
    this.documentClickListener = e => {
      console.log('click listener....');
      //this.menuVisible = false;
    }
  }

  attached(){
    this.element.addEventListener('click', this.documentClickListener);
  }

  detached(){
    this.element.removeEventListener('click', this.documentClickListener);
  }

  onDefaultButtonClick(event) {
    if(this.onClick){
      this.onClick(event);
    }
  }

  onDropdownClick(event, menu, defaultbtn) {
    this.menuVisible= !this.menuVisible;
    this.domHandler.relativePosition(menu, defaultbtn);
    this.domHandler.fadeIn(menu,25);
    event.stopPropagation();
  }

  getItemUrl(item: SplitButtonItem): string {
    console.log('getting item url....');
    return '#';
    /*  if(item.url) {
    if(Array.isArray(item.url))
    return this.location.prepareExternalUrl(this.router.generate(item.url).toLinkUrl());
    else
    return item.url;
  }
  else {
  return '#';
}*/
}
}
