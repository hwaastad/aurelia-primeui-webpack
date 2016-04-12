import {bindable,autoinject,customElement,LogManager} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

@customElement('p-datascroller')
@autoinject
export class DataScrollerComponent {
  @bindable value: any[];
  @bindable rows: number;
  @bindable lazy: boolean;
  @bindable onLazyLoad;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable buffer: number = 0.9;
  @bindable inline: boolean;
  @bindable scrollHeight: any;
  @bindable loader: any;

  //@ContentChild(Header) header;

  //@ContentChild(Footer) footer;

  //@ContentChild(TemplateRef) itemTemplate: TemplateRef;



  private dataToRender: any[] = [];
  private first: number = 0;
  differ: any;
  scrollFunction: any;
  contentElement: any;

  constructor(private element: Element,private domHandler: DomHandler) {}

  attached() {
    if(this.loader) {
      this.scrollFunction = e => {
        this.load();
      }
      this.loader.addEventListener('click',this.scrollFunction);
    }
    else {
      this.bindScrollListener();
    }

    this.load()
  }

  /*  ngDoCheck() {
  let changes = this.differ.diff(this.value);

  if(changes) {
  if(this.lazy)
  this.dataToRender = this.value;
  else
  this.load();
}
}*/

load() {
  if(this.lazy) {
    if(this.onLazyLoad){
      this.onLazyLoad({
        first: this.first,
        rows: this.rows
      });
    }
  }
  else {
    for(let i = this.first; i < (this.first + +this.rows); i++) {
      if(i >= this.value.length) {
        break;
      }

      this.dataToRender.push(this.value[i]);
    }
  }
  this.first = this.first + +this.rows;
}

isEmpty() {
  return !this.dataToRender||(this.dataToRender.length == 0);
}

createLazyLoadMetadata(): any {
  return {
    first: this.first,
    rows: this.rows
  };
}

bindScrollListener() {
  if(this.inline) {
    this.contentElement = this.domHandler.findSingle(this.element, 'div.ui-datascroller-content');
    this.scrollFunction = e => {
      let scrollTop = this.contentElement.scrollTop;
      let scrollHeight = this.contentElement.scrollHeight;
      let viewportHeight = this.contentElement.clientHeight;

      if((scrollTop >= ((scrollHeight * this.buffer) - (viewportHeight)))) {
        this.load();
      }
    }

    this.contentElement.addEventListener('scroll',this.scrollFunction);
  }
  else {
    this.scrollFunction = e => {
      let docBody = document.body;
      let docElement = document.documentElement;
      let scrollTop = (window.pageYOffset||document.documentElement.scrollTop);
      let winHeight = docElement.clientHeight;
      let docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);

      if(scrollTop >= ((docHeight * this.buffer) - winHeight)) {
        this.load();
      }
    };

    window.addEventListener('scroll',this.scrollFunction);
  }

}

detached() {

  //unbind
  if(this.scrollFunction) {
    if(this.inline)
    this.contentElement.removeEventListener('scroll',this.scrollFunction);
    else
    window.removeEventListener('scroll',this.scrollFunction);
    if(this.loader){
      this.loader.removeEventListener('click',this.scrollFunction);
    }
    this.contentElement = null;
  }
}
}
