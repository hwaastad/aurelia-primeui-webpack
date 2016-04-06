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



      ]);
      return config;
    });
  }
}
