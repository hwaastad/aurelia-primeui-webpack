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
        { route: 'listbox',  name: 'editor', moduleId: './components/listbox/listbox',  nav: true, title:'listbox' },
      ]);
      return config;
    });
  }
}
