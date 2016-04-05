import {bindable,autoinject,customElement} from 'aurelia-framework';
import {DomHandler} from '../dom/domhandler';

declare var Quill: any;

@customElement('p-editor')
@autoinject()
export class Editor {
  @bindable value: string;
  @bindable valueChange;
  @bindable onTextChange;
  //@ContentChild(Header) toolbar;
  @bindable style: string;
  @bindable styleClass: string;
  selfChange: boolean;
  quill: any;

  constructor(private element: Element, private domHandler: DomHandler){

  }

  attached(){
    let editorElement = this.domHandler.findSingle(this.element ,'div.ui-editor-content');
    let toolbarElement = this.domHandler.findSingle(this.element ,'div.ui-editor-toolbar');
    this.quill = new Quill(editorElement, {
      modules: {toolbar: toolbarElement},
      theme: 'snow'
    });
    console.dir(this.quill);

    this.quill.on('text-change', (delta, source) => {
      this.selfChange = true;
      let htmlValue = this.quill.getHTML();
      if(htmlValue == '<div><br></div>') {
        htmlValue = null;
      }
      if(this.onTextChange){
        this.onTextChange({
          htmlValue: htmlValue,
          textValue: this.quill.getText(),
          delta: delta,
          source: source
        });
      }
      if(this.valueChange){
        this.valueChange(htmlValue);
      }
    });

    if(this.value) {
      this.quill.setHTML(this.value);
    }
  }
}
