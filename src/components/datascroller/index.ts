import {autoinject} from 'aurelia-framework';
import {Router,RouterConfiguration} from 'aurelia-router';
@autoinject
export class ScrollerIndex {

  constructor(private router:Router){

  }

  configureRouter(config:RouterConfiguration, router:Router) {
    config.map([
      { route: ['', 'window'], moduleId: './datascrollerdemo', nav:true, name: 'Window', title:'Window' },
      { route: ['datascrollerinlinedemo'], moduleId: './datascrollerinlinedemo', nav:true, name: 'Inline',title:'Inline' },
      { route: ['datascrollerloaderdemo'], moduleId: './datascrollerloaderdemo', nav:true, name: 'Loader',title:'Loader' },
      { route: ['datascrollerinfinitedemo'], moduleId: './datascrollerinfinitedemo', nav:true, name: 'Infinite',title:'Infinite*' },

    ]);

    this.router = router;
  }
}
