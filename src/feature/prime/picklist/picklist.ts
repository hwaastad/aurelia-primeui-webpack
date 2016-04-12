import {bindable,autoinject,customElement,LogManager} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

@customElement('p-picklist')
@autoinject
export class PickListComponent {
  @bindable source: any[];
  @bindable target: any[];
  @bindable sourceHeader: string;
  @bindable targetHeader: string;
  @bindable responsive: boolean;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable sourceStyle: string;
  @bindable targetStyle: string;

  constructor(private element:Element,private domHandler:DomHandler){}

  onMouseover(event) {
    let element = event.target;
    if(element.nodeName != 'UL') {
      let item = this.findListItem(element);
      this.domHandler.addClass(item, 'ui-state-hover');
    }
  }

  onMouseout(event) {
    let element = event.target;
    if(element.nodeName != 'UL') {
      let item = this.findListItem(element);
      this.domHandler.removeClass(item, 'ui-state-hover');
    }
  }

  onClick(event) {
    let element = event.target;
    if(element.nodeName != 'UL') {
      let item = this.findListItem(element);
      this.onItemClick(event, item);
    }
  }

  findListItem(element) {
    if(element.nodeName == 'LI') {
      return element;
    }
    else {
      let parent = element.parentElement;
      while(parent.nodeName != 'LI') {
        parent = parent.parentElement;
      }
      return parent;
    }
  }

  onItemClick(event, item) {
    let metaKey = (event.metaKey||event.ctrlKey);

    if(this.domHandler.hasClass(item, 'ui-state-highlight')) {
      if(metaKey) {
        this.domHandler.removeClass(item, 'ui-state-highlight');
      }
    }
    else {
      if(!metaKey) {
        let siblings = this.domHandler.siblings(item);
        for(let i = 0; i < siblings.length; i++) {
          let sibling = siblings[i];
          if(this.domHandler.hasClass(sibling, 'ui-state-highlight')) {
            this.domHandler.removeClass(sibling, 'ui-state-highlight');
          }
        }
      }

      this.domHandler.removeClass(item, 'ui-state-hover');
      this.domHandler.addClass(item, 'ui-state-highlight');
    }
  }

  moveUp(listElement, list) {
    let selectedElements = this.getSelectedListElements(listElement);
    for(let i = 0; i < selectedElements.length; i++) {
      let selectedElement = selectedElements[i];
      let selectedElementIndex: number = this.domHandler.index(selectedElement);

      if(selectedElementIndex != 0) {
        let movedItem = list[selectedElementIndex];
        let temp = list[selectedElementIndex-1];
        this.move(list,selectedElementIndex,selectedElementIndex-1);
        Array.from(this.getListItems(listElement))[selectedElementIndex].classList.remove('ui-state-highlight');
        Array.from(this.getListItems(listElement))[selectedElementIndex - 1].classList.add('ui-state-highlight');
        list[selectedElementIndex-1] = movedItem;
        list[selectedElementIndex] = temp;
        //this.domHandler.scrollInView(listElement, this.getListElements(listElement)[selectedElementIndex -1]);
      }
      else {
        break;
      }
    }
  }

  moveTop(listElement, list) {
    let selectedElements = this.getSelectedListElements(listElement);
    for(let i = 0; i < selectedElements.length; i++) {
      let selectedElement = selectedElements[i];
      let selectedElementIndex: number = this.domHandler.index(selectedElement);

      if(selectedElementIndex != 0) {
        let ind=0+i;
        let movedItem = list.splice(selectedElementIndex,1)[0];
        Array.from(this.getListItems(listElement))[selectedElementIndex].classList.remove('ui-state-highlight');
        Array.from(this.getListItems(listElement))[ind].classList.add('ui-state-highlight');
        list.unshift(movedItem);
        listElement.scrollTop = 0;
      }
      else {
        break;
      }
    }
  }

  moveDown(listElement, list) {
    let selectedElements = this.getSelectedListElements(listElement);
    for(let i = selectedElements.length - 1; i >= 0; i--) {
      let selectedElement = selectedElements[i];
      let selectedElementIndex: number = this.domHandler.index(selectedElement);

      if(selectedElementIndex != (list.length - 1)) {
        let movedItem = list[selectedElementIndex];
        let temp = list[selectedElementIndex+1];
        this.move(list,selectedElementIndex,selectedElementIndex+1);
        Array.from(this.getListItems(listElement))[selectedElementIndex].classList.remove('ui-state-highlight');
        Array.from(this.getListItems(listElement))[selectedElementIndex + 1].classList.add('ui-state-highlight');
        list[selectedElementIndex+1] = movedItem;
        list[selectedElementIndex] = temp;
        //this.domHandler.scrollInView(listElement, this.getListElements(listElement)[selectedElementIndex + 1]);
      } else {
        break;
      }
    }
  }

  moveBottom(listElement, list) {
    let selectedElements = this.getSelectedListElements(listElement);
    for(let i = selectedElements.length - 1; i >= 0; i--) {
        let ind = list.length-i-1;
      let selectedElement = selectedElements[i];
      let selectedElementIndex: number = this.domHandler.index(selectedElement);

      if(selectedElementIndex != (list.length - 1)) {
        Array.from(this.getListItems(listElement))[selectedElementIndex].classList.remove('ui-state-highlight');
        Array.from(this.getListItems(listElement))[ind].classList.add('ui-state-highlight');
        let movedItem = list.splice(selectedElementIndex,1)[0];
        list.push(movedItem);
        listElement.scrollTop = listElement.scrollHeight;
      }
      else {
        break;
      }
    }
  }

  moveRight(sourceListElement) {
    let selectedElements = this.getSelectedListElements(sourceListElement);
    let i = selectedElements.length;
    while(i--) {
      this.target.push(this.source.splice(this.domHandler.index(selectedElements[i]),1)[0]);
    }
  }

  moveAllRight() {
    for(let i = 0; i < this.source.length; i++) {
      this.target.push(this.source[i]);
    }
    this.source.splice(0, this.source.length);
  }

  moveLeft(targetListElement) {
    let selectedElements = this.getSelectedListElements(targetListElement);
    let i = selectedElements.length;
    while(i--) {
      this.source.push(this.target.splice(this.domHandler.index(selectedElements[i]),1)[0]);
    }
  }

  moveAllLeft() {
    for(let i = 0; i < this.target.length; i++) {
      this.source.push(this.target[i]);
    }
    this.target.splice(0, this.target.length);
  }

  getListElements(listElement) {
    return listElement.children;
  }

  getSelectedListElements(listElement) {
    return this.domHandler.find(listElement, 'li.ui-state-highlight');
  }

  move(array:any, fromIndex, toIndex){
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] );
    return array;
  }

  getListItems(listElement){
    return this.domHandler.find(listElement, 'li');
  }

}
