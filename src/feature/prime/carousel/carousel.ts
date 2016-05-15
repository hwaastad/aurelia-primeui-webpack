import {bindable,autoinject,customElement,computedFrom} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';
@customElement('p-carousel')
@autoinject
export class CarouselComponent {
  @bindable value: any[];
  @bindable numVisible: number = 3;
  @bindable firstVisible: number =0;
  @bindable headerText: string;
  @bindable circular: boolean=false;
  @bindable breakpoint: number=560;
  @bindable responsive: boolean=undefined;
  @bindable autoplayInterval: number=0;
  @bindable effectDuration: any = '1s';
  @bindable easing: string = 'ease-out';
  @bindable pageLinks: number = 3;
  @bindable style: any;
  @bindable styleClass: string;

  private container: any;
  private left: any = 0;
  private viewport: any;
  private itemsContainer: any;
  private items: any;
  private columns: any;
  private page: number;
  private valuesChanged: any;
  private interval: any;
  private anchorPageLinks: any[];
  private mobileDropdownOptions: any[];
  private selectDropdownOptions: any[];
  private shrinked: boolean;
  documentResponsiveListener: any;

  constructor(private element:Element, private domHandler: DomHandler){
    if(window.innerWidth <= this.breakpoint) {
      this.shrinked = true;
      this.columns = 1;
    }
    else {
      this.shrinked = false;
      this.columns = this.numVisible;
    }
    this.page = Math.floor(this.firstVisible / this.columns);

    this.documentResponsiveListener = e => {
      this.updateState();
      this.updateMobileDropdown();
      this.updateLinks();
      this.updateDropdown();
    }
  }

  bind(){

  }

  attached(){
    this.container = this.element.firstChild;
    this.viewport = this.domHandler.findSingle(this.element, 'div.ui-carousel-viewport');
    this.itemsContainer = this.domHandler.findSingle(this.element, 'ul.ui-carousel-items');

    if(this.responsive) {
      window.addEventListener('resize',this.documentResponsiveListener);
    }

    if(this.value && this.value.length) {
      this.render();
    }
    this.updateState();
  }

  updateLinks() {
    this.anchorPageLinks = [];
    for (let i = 0; i < this.totalPages; i++) {
      this.anchorPageLinks.push(i);
    }
  }

  updateDropdown() {
    this.selectDropdownOptions = [];
    for (let i = 0; i < this.totalPages; i++) {
      this.selectDropdownOptions.push(i);
    }
  }

  updateMobileDropdown() {
    this.mobileDropdownOptions = [];
    for (let i = 0; i < this.value.length; i++) {
      this.mobileDropdownOptions.push(i);
    }
  }

  render() {
    this.items = this.domHandler.find(this.itemsContainer,'li');
    this.calculateItemWidths();

    if(!this.responsive) {
      this.container.style.width = (this.domHandler.width(this.container)) + 'px';
    }

    if(this.autoplayInterval) {
      this.circular = true;
      this.startAutoplay();
    }
  }

  calculateItemWidths () {
    let firstItem = (this.items && this.items.length) ? this.items[0] : null;
    if(firstItem) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].style.width = ((this.domHandler.innerWidth(this.viewport) - (this.domHandler.getHorizontalMargin(firstItem) * this.columns)) / this.columns) + 'px';
      }
    }
  }

  onNextNav() {
    let lastPage = (this.page === (this.totalPages - 1));

    if(!lastPage)
    this.setPage(this.page + 1);
    else if(this.circular)
    this.setPage(0);
  }

  onPrevNav() {
    if(this.page !== 0)
    this.setPage(this.page - 1);
    else if(this.circular)
    this.setPage(this.totalPages - 1);
  }

  setPage(p, enforce?: boolean) {
    if(p !== this.page || enforce) {
      this.page = p;
      this.left = (-1 * (this.domHandler.innerWidth(this.viewport) * this.page));
      this.firstVisible = this.page * this.columns;
    }
  }

  onDropdownChange(val: string) {
    this.setPage(parseInt(val));
  }

  @computedFrom('totalPages','pageLinks','shrinked')
  get displayPageLinks(): boolean {
    return (this.totalPages <= this.pageLinks && !this.shrinked);
  }

  @computedFrom('totalPages','pageLinks','shrinked')
  get displayPageDropdown(): boolean {
    return (this.totalPages > this.pageLinks && !this.shrinked);
  }

  @computedFrom('value','columns')
  get totalPages(): number {
    return (this.value && this.value.length) ? Math.ceil(this.value.length / this.columns) : 0;
  }

  routerDisplay () {
    let win = window;
    if(win.innerWidth <= this.breakpoint)
    return true;
    else
    return false;
  }

  updateState() {
    let win = window;
    if(win.innerWidth <= this.breakpoint) {
      this.shrinked = true;
      this.columns = 1;
    }
    else if(this.shrinked) {
      this.shrinked = false;
      this.columns = this.numVisible;
      this.updateLinks();
      this.updateDropdown();
    }

    this.calculateItemWidths();
    this.setPage(Math.floor(this.firstVisible / this.columns), true);
  }

  startAutoplay() {
    this.interval = setInterval(() => {
      if(this.page === (this.totalPages - 1))
      this.setPage(0);
      else
      this.setPage(this.page + 1);
    },
    this.autoplayInterval);
  }

  stopAutoplay() {
    clearInterval(this.interval);
  }

  detached() {
    if(this.responsive) {
      window.removeEventListener('resize',this.documentResponsiveListener);
    }

    if(this.autoplayInterval) {
      this.stopAutoplay();
    }
  }
}
