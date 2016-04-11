import {bindable,autoinject,customElement,LogManager} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

@customElement('p-datalist')
@autoinject
export class DataListComponent {
  private logger = LogManager.getLogger('DataListComponent');
  @bindable value: any[];
  @bindable paginator: boolean = undefined;
  @bindable rows: number;
  @bindable totalRecords: number;
  @bindable pageLinks: number = 5;
  @bindable rowsPerPageOptions: number[];
  @bindable lazy: boolean;
  @bindable onLazyLoad;
  @bindable style: string;
  @bindable styleClass: string;

  header: any = undefined;

  //  @ContentChild(Footer) footer;

  //  @ContentChild(TemplateRef) itemTemplate: TemplateRef;

  private dataToRender: any[];

  private first: number = 0;

  private page: number = 0;

  constructor(private element:Element, private domHandler:DomHandler){}


  bind(){
    if(this.lazy) {
      if(this.onLazyLoad){
        this.onLazyLoad({
          first: this.first,
          rows: this.rows
        });
      }
    }
    this.updatePaginator()
    this.updateDataToRender(this.value);
  }

  updatePaginator() {
    //total records
    this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length: 0);

    //first
    if(this.totalRecords && this.first >= this.totalRecords) {
      let numberOfPages = Math.ceil(this.totalRecords/this.rows);
      this.first = Math.max((numberOfPages-1) * this.rows, 0);
    }
  }

  paginate(event) {
    this.first = event.first;
    this.rows = event.rows;

    if(this.lazy) {
      if(this.onLazyLoad){
        this.onLazyLoad(this.createLazyLoadMetadata());
      }
    }
    else {
      this.updateDataToRender(this.value);
    }
  }

  updateDataToRender(datasource) {
    if(this.paginator && datasource) {
      this.dataToRender = [];
      let startIndex = this.lazy ? 0 : this.first;
      for(let i = startIndex; i < (startIndex+ +this.rows); i++) {
        if(i >= datasource.length) {
          break;
        }

        this.dataToRender.push(datasource[i]);
      }
    }
    else {
      this.dataToRender = datasource;
    }
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

}
