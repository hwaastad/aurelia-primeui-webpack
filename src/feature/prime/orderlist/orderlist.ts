import {bindable,autoinject,customElement} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

@customElement('p-orderlist')
@autoinject
export class OrderList {
  @bindable value: any[];

  @bindable header: string;

  @bindable style: string;

  @bindable styleClass: string;

  @bindable listStyle: string;

  @bindable responsive: boolean;

  @bindable onReorder;

  //  @ContentChild(TemplateRef) itemTemplate: TemplateRef;

  constructor(private el: Element, private domHandler: DomHandler) {
  }

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

  moveUp(event,listElement) {
    let selectedElements = this.getSelectedListElements(listElement);
    if(selectedElements.length) {
      for(let i = 0; i < selectedElements.length; i++) {
        let selectedElement = selectedElements[i];
        let selectedElementIndex: number = this.domHandler.index(selectedElement);

        if(selectedElementIndex != 0) {
          this.value = this.move(this.value,selectedElementIndex,selectedElementIndex-1);
          this.domHandler.scrollInView(listElement, listElement.children[selectedElementIndex - 1]);
          Array.from(this.getStuff(listElement))[selectedElementIndex].classList.remove('ui-state-highlight');
          Array.from(this.getStuff(listElement))[selectedElementIndex - 1].classList.add('ui-state-highlight');
        }
        else {
          break;
        }
      }
      if(this.onReorder){
        this.onReorder(event);
      }
    }
  }

  moveTop(event,listElement) {
    let selectedElements = this.getSelectedListElements(listElement);
    if(selectedElements.length) {
      for(let i = 0; i < selectedElements.length; i++) {
        let selectedElement = selectedElements[i];
        let selectedElementIndex: number = this.domHandler.index(selectedElement);

        if(selectedElementIndex != 0) {
          let ind=0+i;
          this.value = this.move(this.value,selectedElementIndex,ind);
          this.domHandler.scrollInView(listElement, listElement.children[0]);
          Array.from(this.getStuff(listElement))[selectedElementIndex].classList.remove('ui-state-highlight');
          Array.from(this.getStuff(listElement))[ind].classList.add('ui-state-highlight');
          listElement.scrollTop = 0;
        }
        else {
          break;
        }
      }
      if(this.onReorder){
        this.onReorder(event);
      }
    }
  }

  moveDown(event,listElement) {
    let selectedElements = this.getSelectedListElements(listElement);
    if(selectedElements.length) {
      for(let i = selectedElements.length - 1; i >= 0; i--) {
        let selectedElement = selectedElements[i];
        let selectedElementIndex: number = this.domHandler.index(selectedElement);

        if(selectedElementIndex != (this.value.length - 1)) {
          this.value = this.move(this.value,selectedElementIndex,selectedElementIndex+1);
          this.domHandler.scrollInView(listElement, listElement.children[selectedElementIndex + 1]);
          Array.from(this.getStuff(listElement))[selectedElementIndex].classList.remove('ui-state-highlight');
          Array.from(this.getStuff(listElement))[selectedElementIndex + 1].classList.add('ui-state-highlight');
        }
        else {
          break;
        }
      }
      if(this.onReorder){
        this.onReorder(event);
      }
    }
  }

  move(array:any, fromIndex, toIndex){
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] );
    return array;
  }

  moveBottom(event,listElement) {
    let selectedElements = this.getSelectedListElements(listElement);
    if(selectedElements.length) {
      for(let i = 0; i <= selectedElements.length - 1; i++) {
        let selectedElement = selectedElements[i];
        let selectedElementIndex: number = this.domHandler.index(selectedElement);

        if(selectedElementIndex != (this.value.length - 1)) {
          let ind = this.value.length-i-1;

          Array.from(this.getStuff(listElement))[selectedElementIndex].classList.remove('ui-state-highlight');
          Array.from(this.getStuff(listElement))[ind].classList.add('ui-state-highlight');
          this.value = this.move(this.value,selectedElementIndex-i,ind);
          listElement.scrollTop = listElement.scrollHeight;
        }
        else {
          break;
        }
      }
      if(this.onReorder){
        this.onReorder(event);
      }
    }
  }

  getSelectedListElements(listElement) {
    return this.domHandler.find(listElement, 'li.ui-state-highlight');
  }

  getStuff(listElement){
    return this.domHandler.find(listElement, 'li');
  }
}
