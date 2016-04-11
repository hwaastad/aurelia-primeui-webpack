import {bindable,autoinject,customElement,computedFrom,LogManager} from 'aurelia-framework';

@customElement('p-paginator')
@autoinject
export class Paginator {
  private logger = LogManager.getLogger('Paginator');
  @bindable rows: number = 0;
  @bindable first: number = 0;
  @bindable pageLinkSize: number = 5;
  @bindable onPageChange;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable rowsPerPageOptions: number[];
  @bindable page:number=0;

  pageLinks: number[];
  @bindable totalRecords: number=undefined;


  bind(){
    this.updatePageLinks();
  }

  @computedFrom('first','rows')
  get firstPage(){
    return this.page === 0;
  }

  @computedFrom('totalRecords','page','rows')
  get lastPage(){
    return this.page === this.getPageCount() - 1;
  }

  getPageCount() {
    return Math.ceil(this.totalRecords/this.rows)||1;
  }

  calculatePageLinkBoundaries() {
    let numberOfPages = this.getPageCount(),
    visiblePages = Math.min(this.pageLinkSize, numberOfPages);

    //calculate range, keep current in middle if necessary
    let start = Math.max(0, Math.ceil(this.page - ((visiblePages) / 2))),
    end = Math.min(numberOfPages - 1, start + visiblePages - 1);

    //check when approaching to last page
    var delta = this.pageLinkSize - (end - start + 1);
    start = Math.max(0, start - delta);

    return [start, end];
  }

  updatePageLinks() {
    this.pageLinks = [];
    let boundaries = this.calculatePageLinkBoundaries(),
    start = boundaries[0],
    end = boundaries[1];

    for(let i = start; i <= end; i++) {
      this.pageLinks.push(i + 1);
    }
  }

  changePage(p :number) {
    var pc = this.getPageCount();

    if(p >= 0 && p < pc) {
      this.first = this.rows * p;
      var state = {
        first: this.first,
        rows: this.rows,
        pageCount: pc
      };
      this.page=p;
      this.updatePageLinks();
      if(this.onPageChange){
        this.onPageChange(state);
      }
    }

  }

  changePageToFirst() {
    this.changePage(0);
  }

  changePageToPrev() {
    this.changePage(this.page - 1);
  }

  changePageToNext() {
    this.changePage(this.page  + 1);
  }

  changePageToLast() {
    this.changePage(this.getPageCount() - 1);
  }

  onRppChange(event) {
    this.rows = this.rowsPerPageOptions[event.target.selectedIndex];
    this.changePageToFirst();
  }
}
