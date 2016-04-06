import {autoinject, bindable, customElement} from 'aurelia-framework';
import {SelectItem} from '../api/selectitem';
import {DomHandler} from '../dom/domhandler';

@customElement('p-selectbutton')
@autoinject()
export class SelectButtonComponent {
    @bindable options: SelectItem[];
    @bindable tabindex: number;
    @bindable multiple: boolean;
    @bindable style: string;
    @bindable styleClass: string;
    @bindable onChange;
    @bindable value: any = undefined;

    private children: HTMLCollection;

    private hoveredItem: any;
    initialized: boolean = false;

    constructor(private element: Element, private domHandler: DomHandler) {

    }

    attached() {
        this.children = (<HTMLElement>this.element.querySelector('div')).children;
        this.initialized = true;
    }

    detached() {

    }

    writeValue(value: any): void {
        this.value = value;
    }

    onFocus(event: MouseEvent) {
        this.domHandler.addClass(event.target, 'ui-state-hover');
    }

    offFocus(event: MouseEvent) {
        this.domHandler.removeClass(event.target, 'ui-state-hover');
    }


    onItemClick(event, option: SelectItem, index: number) {
        if (this.multiple) {
            let itemIndex = this.findItemIndex(option);
            if (itemIndex != -1) {
                this.value.splice(itemIndex, 1);
                this.domHandler.removeClass(this.children[index], 'ui-state-active');
            }
            else {
                this.value.push(option.value);
                this.domHandler.addClass(this.children[index], 'ui-state-active');
            }
        }
        else {
            this.value = option.value;
            Array.from(this.children).forEach(element => {
                this.domHandler.removeClass(element, 'ui-state-active');
            });
            this.domHandler.addClass(this.children[index], 'ui-state-active');
        }


        if (this.onChange) {
            this.onChange({
                originalEvent: event,
                value: this.value
            });
        }
    }

    isSelected(option: SelectItem, index: number) {
        if (this.multiple)
            return this.findItemIndex(option) != -1;
        else {
            return option.value == this.value;
        }
    }

    findItemIndex(option: SelectItem) {
        let index = -1;
        if (this.value) {
            for (let i = 0; i < this.value.length; i++) {
                if (this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }

    unselectSiblings(item) {
        let siblings = this.domHandler.siblings(item);
        for (let i = 0; i < siblings.length; i++) {
            let sibling = siblings[i];
            if (this.domHandler.hasClass(sibling, 'ui-state-active')) {
                this.domHandler.removeClass(sibling, 'ui-state-active');
            }
        }
    }

    valueChanged(newVal, oldVal) {
        if (!this.initialized) return;
        if (typeof newVal !== 'string') {
            Array.from(this.children).forEach(element => {
                this.domHandler.removeClass(element, 'ui-state-active');
            });
        } else {
            if ((!newVal || newVal == null)) {
                Array.from(this.children).forEach(element => {
                    this.domHandler.removeClass(element, 'ui-state-active');
                });
            }
        }
    }
}
