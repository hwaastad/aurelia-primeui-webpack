import {autoinject} from 'aurelia-framework';
import {Router,RouterConfiguration} from 'aurelia-router';

@autoinject
export class AppRouterConfig {

  constructor(private router: Router){
  }

  configure(){
    this.router.configure(config => {
      config.title = 'Aurelia';
      //config.addPipelineStep('authorize', AuthorizeStep);
      config.map([
        { route: ['','home'],  name: 'home', moduleId: './home', nav: true, title:'home' },
        { route: 'inputtext',  name: 'inputtext', moduleId: './components/inputtext/inputtext',  nav: true, title:'inputtext' },
        { route: 'autocomplete',  name: 'autocomplete', moduleId: './components/autocomplete/autocomplete',  nav: true, title:'autocomplete' },
        { route: 'calendar',  name: 'calendar', moduleId: './components/calendar/calendar',  nav: true, title:'calendar' },
        { route: 'checkbox',  name: 'checkbox', moduleId: './components/checkbox/checkbox',  nav: true, title:'checkbox' },
        { route: 'editor',  name: 'editor', moduleId: './components/editor/editor',  nav: true, title:'editor' },
        { route: 'listboxdemo',  name: 'listboxdemo', moduleId: './components/listbox/listboxdemo',  nav: true, title:'listboxdemo' },
        { route: 'password',  name: 'password', moduleId: './components/password/password',  nav: true, title:'password' },
        { route: 'rating',  name: 'rating', moduleId: './components/rating/rating',  nav: true, title:'rating' },
        { route: 'spinnerdemo',  name: 'spinnerdemo', moduleId: './components/spinner/spinnerdemo',  nav: true, title:'spinnerdemo' },
        { route: 'togglebutton',  name: 'togglebutton', moduleId: './components/togglebutton/togglebutton',  nav: true, title:'togglebutton' },
        { route: 'dropdown',  name: 'dropdown', moduleId: './components/dropdown/dropdown',  nav: true, title:'dropdown' },
        { route: 'inputswitchdemo',  name: 'inputswitchdemo', moduleId: './components/inputswitch/inputswitchdemo',  nav: true, title:'inputswitchdemo' },
        { route: 'textareademo',  name: 'textareademo', moduleId: './components/textarea/textareademo',  nav: true, title:'textareademo' },
        { route: 'multiselect',  name: 'multiselect', moduleId: './components/multiselect/multiselectdemo',  nav: true, title:'multiselectdemo' },
        { route: 'radiobuttondemo',  name: 'radiobuttondemo', moduleId: './components/radiobutton/radiobuttondemo',  nav: true, title:'radiobuttondemo' },
        { route: 'sliderdemo',  name: 'sliderdemo', moduleId: './components/slider/sliderdemo',  nav: true, title:'sliderdemo' },
        { route: 'selectbuttondemo',  name: 'selectbuttondemo', moduleId: './components/selectbutton/selectbuttondemo',  nav: true, title:'selectbuttondemo' },
        { route: 'buttondemo',  name: 'buttondemo', moduleId: './components/button/buttondemo',  nav: true, title:'buttondemo' },
        { route: 'splitbuttondemo',  name: 'splitbuttondemo', moduleId: './components/splitbutton/splitbuttondemo',  nav: true, title:'splitbuttondemo' },
        { route: 'messagesdemo',  name: 'messagesdemo', moduleId: './components/messages/messagesdemo',  nav: true, title:'messagesdemo' },
        { route: 'growldemo',  name: 'growldemo', moduleId: './components/growl/growldemo',  nav: true, title:'growldemo' },
        { route: 'paneldemo',  name: 'paneldemo', moduleId: './components/panel/paneldemo',  nav: true, title:'paneldemo' },
        { route: 'accordiondemo',  name: 'accordiondemo', moduleId: './components/accordion/accordiondemo',  nav: true, title:'accordiondemo' },
        { route: 'fieldsetdemo',  name: 'fieldsetdemo', moduleId: './components/fieldset/fieldsetdemo',  nav: true, title:'fieldsetdemo' },
        { route: 'tabviewdemo',  name: 'tabviewdemo', moduleId: './components/tabview/tabviewdemo',  nav: true, title:'tabviewdemo' },
        { route: 'dialogdemo',  name: 'dialogdemo', moduleId: './components/dialog/dialogdemo',  nav: true, title:'dialogdemo' },
        { route: 'lightboxdemo',  name: 'lightboxdemo', moduleId: './components/lightbox/lightboxdemo',  nav: true, title:'lightboxdemo' },
        { route: 'overlaypaneldemo',  name: 'overlaypaneldemo', moduleId: './components/overlaypanel/overlaypaneldemo',  nav: true, title:'overlaypaneldemo' },
        { route: 'datatabledemo',  name: 'datatabledemo', moduleId: './components/datatable/index',  nav: true, title:'datatabledemo' },
        { route: 'paginatordemo',  name: 'paginatordemo', moduleId: './components/paginator/paginatordemo',  nav: true, title:'paginatordemo' },
        { route: 'orderlistdemo',  name: 'orderlistdemo', moduleId: './components/orderlist/orderlistdemo',  nav: true, title:'orderlistdemo' },
        { route: 'carouseldemo',  name: 'carouseldemo', moduleId: './components/carousel/carouseldemo',  nav: true, title:'carouseldemo' },
        { route: 'datalistdemo',  name: 'datalistdemo', moduleId: './components/datalist/datalistdemo',  nav: true, title:'datalistdemo' },
        { route: 'datascrollerdemo',  name: 'datascrollerdemo', moduleId: './components/datascroller/index',  nav: true, title:'datascrollerdemo' },
        { route: 'picklistdemo',  name: 'picklistdemo', moduleId: './components/picklist/picklistdemo',  nav: true, title:'picklistdemo' },
        { route: 'breadcrumbdemo',  name: 'breadcrumbdemo', moduleId: './components/breadcrumb/breadcrumbdemo',  nav: true, title:'breadcrumbdemo' },
        { route: 'menudemo',  name: 'menudemo', moduleId: './components/menu/menudemo',  nav: true, title:'menudemo' },
        { route: 'panelmenudemo',  name: 'panelmenudemo', moduleId: './components/panelmenu/panelmenudemo',  nav: true, title:'panelmenudemo' },
        { route: 'tieredmenudemo',  name: 'tieredmenudemo', moduleId: './components/tieredmenu/tieredmenudemo',  nav: true, title:'tieredmenudemo' },
        { route: 'slidemenudemo',  name: 'slidemenudemo', moduleId: './components/slidemenu/slidemenudemo',  nav: true, title:'slidemenudemo' },
        { route: 'menubardemo',  name: 'menubardemo', moduleId: './components/menubar/menubardemo',  nav: true, title:'menubardemo' },
        { route: 'megamenudemo',  name: 'megamenudemo', moduleId: './components/megamenu/megamenudemo',  nav: true, title:'megamenudemo' },
        { route: 'progressbardemo',  name: 'progressbardemo', moduleId: './components/progressbar/progressbardemo',  nav: true, title:'progressbardemo' },
        { route: 'galleriademo',  name: 'galleriademo', moduleId: './components/galleria/galleriademo',  nav: true, title:'galleriademo' },
        { route: 'scheduledemo',  name: 'scheduledemo', moduleId: './components/schedule/scheduledemo',  nav: true, title:'scheduledemo' },
        { route: 'barchartdemo',  name: 'barchartdemo', moduleId: './components/charts/barchartdemo',  nav: true, title:'barchartdemo' },
        { route: 'linechartdemo',  name: 'linechartdemo', moduleId: './components/charts/linechartdemo',  nav: true, title:'linechartdemo' },
        { route: 'piechartdemo',  name: 'piechartdemo', moduleId: './components/charts/piechartdemo',  nav: true, title:'piechartdemo' },
        { route: 'doughnutdemo',  name: 'doughnutdemo', moduleId: './components/charts/doughnutdemo',  nav: true, title:'doughnutdemo' },
        { route: 'polarareachartdemo',  name: 'polarareachartdemo', moduleId: './components/charts/polarareachartdemo',  nav: true, title:'polarareachartdemo' },
        { route: 'radarchartdemo',  name: 'radarchartdemo', moduleId: './components/charts/radarchartdemo',  nav: true, title:'radarchartdemo' },

        { route: 'ampiechartdemo',  name: 'ampiechartdemo', moduleId: './components/amcharts/am-piechartdemo',  nav: true, title:'ampiechartdemo' },
        { route: 'ambarchartdemo',  name: 'ambarchartdemo', moduleId: './components/amcharts/am-barchartdemo',  nav: true, title:'ambarchartdemo' },
        { route: 'amdonutdemo',  name: 'amdonutdemo', moduleId: './components/amcharts/am-amdonutdemo',  nav: true, title:'amdonutdemo' },

      

      ]);
      return config;
    });
  }
}
