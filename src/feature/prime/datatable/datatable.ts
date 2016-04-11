import {autoinject,bindable,customElement} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';
import {SortMeta} from '../api/sortmeta';
import {FilterMetadata,LazyLoadEvent} from '../api/lazyload';
import {Column} from '../column/column';

@customElement('p-datatable')
@autoinject
export class DataTable {
  @bindable value: any[];
  @bindable paginator: boolean;
  @bindable rows: number;
  @bindable totalRecords: number;
  @bindable pageLinks: number = 5;
  @bindable rowsPerPageOptions: number[];
  @bindable responsive: boolean;
  @bindable stacked: boolean;
  @bindable selectionMode: string;
  @bindable selection: any;
  //@bindable selectionChange: EventEmitter<any> = new EventEmitter();
  @bindable editable: boolean;
  @bindable onRowSelect;
  @bindable onRowUnselect;
  @bindable onRowDblclick;
  @bindable onContextMenuSelect;
  @bindable filterDelay: number = 300;
  @bindable lazy: boolean;
  @bindable onLazyLoad;
  @bindable resizableColumns: boolean;
  @bindable columnResizeMode: string;
  @bindable onColResize;
  @bindable reorderableColumns: boolean;
  @bindable onColReorder;
  @bindable scrollable: boolean;
  @bindable scrollHeight: any;
  @bindable scrollWidth: any;
  @bindable headerRows: any;
  @bindable footerRows: any;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable globalFilter: any;
  @bindable sortMode: string = 'single';
  @bindable sortField: string;
  @bindable sortOrder: number;
  @bindable multiSortMeta: SortMeta[];
  @bindable contextMenu: any;
  @bindable onEditInit;
  @bindable onEditComplete;
  @bindable onEdit;
  @bindable onEditCancel;

  //  @ContentChild(Header) header;
  //  @ContentChild(Footer) footer;

  private dataToRender: any[];
  private first: number = 0;
  private page: number = 0;
  private filterTimeout: any;
  private filters: {[s: string]: FilterMetadata;} = {};
  private filteredValue: any[];
  private columns: Column[];
  private columnsUpdated: boolean = false;
  private sortedByDefault: boolean;
  differ: any;
  globalFilterFunction: any;
  preventBlurOnEdit: boolean;

  constructor(private element:Element,private domHandler:DomHandler){

  }

  bind(){
    if(this.lazy){
      if(this.onLazyLoad){
        this.onLazyLoad({
          first: this.first,
          rows: this.rows,
          sortField: this.sortField,
          sortOrder: this.sortOrder,
          filters: null,
          multiSortMeta: this.multiSortMeta
        });
      }
    }
  }

  attached(){
    if(this.columnsUpdated) {
      if(this.resizableColumns) {
        this.initResizableColumns();
      }

      if(this.reorderableColumns) {
        this.initColumnReordering();
      }

      if(this.scrollable) {
        this.initScrolling();
      }

      this.columnsUpdated = false;
    }

    //check
  /*  if(this.globalFilter) {
      this.globalFilterFunction = this.renderer.listen(this.globalFilter, 'keyup', () => {
        this.filterTimeout = setTimeout(() => {
          this.filter();
          this.filterTimeout = null;
        }, this.filterDelay);
      });
    }*/
  }

  resolveFieldData(data: any, field: string): any {
    if(data && field) {
      if(field.indexOf('.') == -1) {
        return data[field];
      }
      else {
        let fields: string[] = field.split('.');
        let value = data;
        for(var i = 0, len = fields.length; i < len; ++i) {
          value = value[fields[i]];
        }
        return value;
      }
    }
    else {
      return null;
    }
  }

  sortByDefault() {
    if(this.sortMode == 'single')
    this.sortSingle();
    else if(this.sortMode == 'multiple')
    this.sortMultiple();
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
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    else {
      this.updateDataToRender(this.value);
    }
  }

  updateDataToRender(datasource) {
    if(this.paginator && datasource) {
      this.dataToRender = [];
      let startIndex = this.lazy ? 0 : this.first;
      for(let i = startIndex; i < (startIndex+ this.rows); i++) {
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

  sort(event, column: Column) {
    if(!column.sortable) {
      return;
    }

    this.sortOrder = (this.sortField === column.field)  ? this.sortOrder * -1 : 1;
    this.sortField = column.field;
    let metaKey = event.metaKey||event.ctrlKey;

    if(this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    else {
      if(this.sortMode == 'multiple') {
        if(!metaKey) {
          this.multiSortMeta = [];
        }

        this.addSortMeta({field: this.sortField, order: this.sortOrder});
        this.sortMultiple();
      }
      else {
        this.sortSingle();
      }
    }
  }

  sortSingle() {
    if(this.value) {
      this.value.sort((data1, data2) => {
        let value1 = this.resolveFieldData(data1, this.sortField);
        let value2 = this.resolveFieldData(data2, this.sortField);
        let result = null;

        if (value1 instanceof String && value2 instanceof String)
        result = value1.localeCompare(value2);
        else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (this.sortOrder * result);
      });

      this.first = 0;

      if(this.hasFilter())
      this.filter();
      else
      this.updateDataToRender(this.value);
    }
  }

  sortMultiple() {
    if(this.value) {
      this.value.sort((data1,data2) => {
        return this.multisortField(data1, data2, this.multiSortMeta, 0);
      });

      if(this.hasFilter())
      this.filter();
      else
      this.updateDataToRender(this.value);
    }

  }

  multisortField(data1,data2,multiSortMeta,index) {
    let value1 = this.resolveFieldData(data1, multiSortMeta[index].field);
    let value2 = this.resolveFieldData(data2, multiSortMeta[index].field);
    let result = null;

    if (typeof value1 == 'string' || value1 instanceof String) {
      if (value1.localeCompare && (value1 != value2)) {
        return (multiSortMeta[index].order * value1.localeCompare(value2));
      }
    }
    else {
      result = (value1 < value2) ? -1 : 1;
    }

    if(value1 == value2)  {
      return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
    }

    return (multiSortMeta[index].order * result);
  }

  addSortMeta(meta) {
    var index = -1;
    for(var i = 0; i < this.multiSortMeta.length; i++) {
      if(this.multiSortMeta[i].field === meta.field) {
        index = i;
        break;
      }
    }

    if(index >= 0)
    this.multiSortMeta[index] = meta;
    else
    this.multiSortMeta.push(meta);
  }

  isSorted(column: Column) {
    if(this.sortMode === 'single') {
      return (this.sortField && column.field === this.sortField);
    }
    else if(this.sortMode === 'multiple') {
      let sorted = false;
      if(this.multiSortMeta) {
        for(let i = 0; i < this.multiSortMeta.length; i++) {
          if(this.multiSortMeta[i].field == column.field) {
            sorted = true;
            break;
          }
        }
      }
      return sorted;
    }
  }

  getSortOrder(column: Column) {
    let order = 0;
    if(this.sortMode === 'single') {
      if(this.sortField && column.field === this.sortField) {
        order = this.sortOrder;
      }
    }
    else if(this.sortMode === 'multiple') {
      if(this.multiSortMeta) {
        for(let i = 0; i < this.multiSortMeta.length; i++) {
          if(this.multiSortMeta[i].field == column.field) {
            order = this.multiSortMeta[i].order;
            break;
          }
        }
      }
    }
    return order;
  }

  onRowClick(event, rowData) {
    if(!this.selectionMode) {
      return;
    }

    let selectionIndex = this.findIndexInSelection(rowData);
    let selected = selectionIndex != -1;
    let metaKey = (event.metaKey||event.ctrlKey);

    if(selected && metaKey) {
      if(this.isSingleSelectionMode()) {
        this.selection = null;
        //this.selectionChange.emit(null);
      }
      else {
        this.selection.splice(selectionIndex,1);
        //this.selectionChange.emit(this.selection);
      }

      this.onRowUnselect.emit({originalEvent: event, data: rowData});
    }
    else {
      if(this.isSingleSelectionMode()) {
        this.selection = rowData;
        //this.selectionChange.emit(rowData);
      }
      else if(this.isMultipleSelectionMode()) {
        this.selection = (!metaKey) ? [] : this.selection||[];
        this.selection.push(rowData);
        //this.selectionChange.emit(this.selection);
      }

      this.onRowSelect.emit({originalEvent: event, data: rowData});
    }
  }

  onRowRightClick(event, rowData) {
    if(this.contextMenu) {
      let selectionIndex = this.findIndexInSelection(rowData);
      let selected = selectionIndex != -1;

      if(!selected) {
        if(this.isSingleSelectionMode()) {
          this.selection = rowData;
          //this.selectionChange.emit(rowData);
        }
        else if(this.isMultipleSelectionMode()) {
          this.selection = [];
          this.selection.push(rowData);
          //this.selectionChange.emit(this.selection);
        }
      }

      this.contextMenu.show(event);
      this.onContextMenuSelect.emit({originalEvent: event, data: rowData});
    }
  }

  rowDblclick(event, rowData) {
    this.onRowDblclick.emit({originalEvent: event, data: rowData});
  }

  isSingleSelectionMode() {
    return this.selectionMode === 'single';
  }

  isMultipleSelectionMode() {
    return this.selectionMode === 'multiple';
  }

  findIndexInSelection(rowData: any) {
    let index: number = -1;

    if(this.selectionMode && this.selection) {
      if(this.isSingleSelectionMode()) {
        index = (this.selection == rowData) ? 0 : - 1;
      }
      else if(this.isMultipleSelectionMode()) {
        for(let i = 0; i  < this.selection.length; i++) {
          if(this.selection[i] == rowData) {
            index = i;
            break;
          }
        }
      }
    }

    return index;
  }

  isSelected(rowData) {
    return this.findIndexInSelection(rowData) != -1;
  }

  onFilterKeyup(value, field, matchMode) {
    if(this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.filters[field] = {value: value, matchMode: matchMode};
      this.filter();
      this.filterTimeout = null;
    }, this.filterDelay);
  }

  filter() {
    if(this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    else {
      this.filteredValue = [];

      for(let i = 0; i < this.value.length; i++) {
        let localMatch = true;
        let globalMatch = false;

        for(let j = 0; j < this.columns.length; j++) {
          let col = this.columns[j],
          filterMeta = this.filters[col.field];

          //local
          if(filterMeta) {
            let filterValue = filterMeta.value,
            filterField = col.field,
            filterMatchMode = filterMeta.matchMode||'startsWith',
            dataFieldValue = this.resolveFieldData(this.value[i], filterField);

            let filterConstraint = this.filterConstraints[filterMatchMode];

            if(!filterConstraint(dataFieldValue, filterValue)) {
              localMatch = false;
            }

            if(!localMatch) {
              break;
            }
          }

          //global
          if(this.globalFilter && !globalMatch && col.filter) {
            globalMatch = this.filterConstraints['contains'](this.value[i][col.field], this.globalFilter.value);

          }
        }

        let matches = localMatch;
        if(this.globalFilter) {
          matches = localMatch&&globalMatch;
        }

        if(matches) {
          this.filteredValue.push(this.value[i]);
        }
      }

      if(this.filteredValue.length === this.value.length) {
        this.filteredValue = null;
      }

      if(this.paginator) {
        this.totalRecords = this.filteredValue ? this.filteredValue.length: this.value ? this.value.length: 0;
      }

      this.updateDataToRender(this.filteredValue||this.value);
    }
  }

  hasFilter() {
    let empty = true;
    for(let prop in this.filters) {
      if(this.filters.hasOwnProperty(prop)) {
        empty = false;
        break;
      }
    }

    return !empty;
  }

  onFilterInputClick(event) {
    event.stopPropagation();
  }

  filterConstraints = {

    startsWith(value, filter): boolean {
      if(filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if(value === undefined || value === null) {
        return false;
      }

      let filterValue = filter.toLowerCase();
      return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
    },

    contains(value, filter): boolean {
      if(filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if(value === undefined || value === null) {
        return false;
      }

      return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    },

    endsWith(value, filter): boolean {
      if(filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if(value === undefined || value === null) {
        return false;
      }

      let filterValue = filter.toLowerCase();
      return value.indexOf(filterValue, value.length - filterValue.length) !== -1;
    }
  }

  switchCellToEditMode(element: any, column: Column, rowData: any) {
    if(!this.selectionMode && this.editable && column.editable) {
      this.onEditInit.emit({column: column, data: rowData});
      let cell = this.findCell(element);
      if(!this.domHandler.hasClass(cell, 'ui-cell-editing')) {
        this.domHandler.addClass(cell, 'ui-cell-editing');
        this.domHandler.addClass(cell, 'ui-state-highlight');
        let editor = cell.querySelector('.ui-cell-editor').focus();
      }
    }
  }

  switchCellToViewMode(element: any, column: Column, rowData: any, complete: boolean) {
    if(this.editable) {
      if(this.preventBlurOnEdit) {
        this.preventBlurOnEdit = false;
      }
      else {
        if(complete)
        this.onEditComplete.emit({column: column, data: rowData});
        else
        this.onEditCancel.emit({column: column, data: rowData});

        let cell = this.findCell(element);
        this.domHandler.removeClass(cell, 'ui-cell-editing');
        this.domHandler.removeClass(cell, 'ui-state-highlight');
      }
    }
  }

  onCellEditorKeydown(event, column: Column, rowData: any) {
    if(this.editable) {
      this.onEdit.emit({originalEvent: event,column: column, data: rowData});

      //enter
      if(event.keyCode == 13) {
        this.switchCellToViewMode(event.target, column, rowData, true);
        this.preventBlurOnEdit = true;
      }
      //escape
      if(event.keyCode == 27) {
        this.switchCellToViewMode(event.target, column, rowData, false);
        this.preventBlurOnEdit = true;
      }
    }
  }

  findCell(element) {
    let cell = element;
    while(cell.tagName != 'TD') {
      cell = cell.parentElement;
    }

    return cell;
  }

  initResizableColumns() {
    jQuery((<HTMLElement>this.element).children[0]).puicolresize({
      mode: this.columnResizeMode,
      colResize: (event: Event, ui: PrimeUI.ColResizeEventParams) => {
        this.onColResize.emit(ui.element);
      }
    });
  }

  initColumnReordering() {
    jQuery((<HTMLElement>this.element).children[0]).puicolreorder({
      colReorder: (event: Event, ui: PrimeUI.ColReorderEventParams) => {
        //right
        if(ui.dropSide > 0) {
          this.columns.splice(ui.dropIndex + 1, 0, this.columns.splice(ui.dragIndex, 1)[0]);
        }
        //left
        else {
          this.columns.splice(ui.dropIndex, 0, this.columns.splice(ui.dragIndex, 1)[0]);
        }

        this.onColReorder.emit({
          dragIndex: ui.dragIndex,
          dropIndex: ui.dropIndex,
          columns: this.columns
        });
      }
    });
  }

  initScrolling() {
    jQuery((<HTMLElement>this.element).children[0]).puitablescroll({
      scrollHeight: this.scrollHeight,
      scrollWidth: this.scrollWidth
    });
  }

  hasFooter() {
    if(this.footerRows) {
      return true;
    }
    else {
      if(this.columns) {
        for(let i = 0; i  < this.columns.length; i++) {
          if(this.columns[i].footer) {
            return true;
          }
        }
      }

    }
    return false;
  }

  isEmpty() {
    return !this.dataToRender||(this.dataToRender.length == 0);
  }

  createLazyLoadMetadata(): LazyLoadEvent {
    return {
      first: this.first,
      rows: this.rows,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      filters: this.filters,
      multiSortMeta: this.multiSortMeta
    };
  }

  ngOnDestroy() {
    if(this.resizableColumns) {
      jQuery((<HTMLElement>this.element).children[0]).puicolresize('destroy');
    }

    if(this.reorderableColumns) {
      jQuery((<HTMLElement>this.element).children[0]).puicolreorder('destroy');
    }

    //remove event listener
    if(this.globalFilterFunction) {
      this.globalFilterFunction();
    }
  }
}
