import {autoinject, customAttribute, bindable} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

@customAttribute('p-button')
@autoinject()
export class ButtonAttribute {
    @bindable icon: string = undefined;
    @bindable iconPos: string = 'left';
    @bindable label: string = undefined;
    @bindable disabled;

    onMouseOver;
    onMouseOut;

    constructor(private element: Element, private domHandler: DomHandler) {
        this.onMouseOver = e => {
            this.domHandler.addClass(this.element, 'ui-state-hover');
        }
        this.onMouseOut = e => {
            this.domHandler.removeClass(this.element, 'ui-state-hover');
        }
    }

    attached() {
        if (this.element.getAttribute('icon')) {
            this.icon = this.element.getAttribute('icon');
        }
        this.domHandler.addMultipleClasses(this.element, this._getStyleClass());
        if (this.icon) {
            let iconElement = document.createElement("span");
            let iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
            iconElement.className = iconPosClass + ' ui-c fa fa-fw ' + this.icon;
            this.element.appendChild(iconElement);
        }
        let labelElement = document.createElement("span");
        labelElement.className = 'ui-button-text ui-c';
        labelElement.appendChild(document.createTextNode(this.label || 'ui-button'));
        this.element.appendChild(labelElement);

        this.element.addEventListener('mouseover', this.onMouseOver);
        this.element.addEventListener('mouseout', this.onMouseOut);
        if ((<HTMLInputElement>this.element).disabled) {
            this.domHandler.addClass(this.element, 'ui-state-disabled');
        }
    }

    detached() {
        while (this.element.hasChildNodes()) {
            this.element.removeChild(this.element.lastChild);
        }
        this.element.removeEventListener('mouseover', this.onMouseOver);
        this.element.removeEventListener('mouseout', this.onMouseOut);
    }

    _getStyleClass() {
        let styleClass = 'ui-button ui-widget ui-state-default ui-corner-all';
        if (this.icon) {
            if (this.label) {
                if (this.iconPos == 'left')
                    styleClass = styleClass + ' ui-button-text-icon-left';
                else
                    styleClass = styleClass + ' ui-button-text-icon-right';
            }
            else {
                styleClass = styleClass + ' ui-button-icon-only';
            }
        }
        else {
            styleClass = styleClass + ' ui-button-text-only';
        }

        return styleClass;
    }

    isDisabled() {
        return (<HTMLInputElement>this.element).disabled;
    }
}
