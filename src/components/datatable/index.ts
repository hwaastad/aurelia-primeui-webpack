import {autoinject} from 'aurelia-framework';
import {Router,RouterConfiguration} from 'aurelia-router';
@autoinject
export class TableIndex {

  constructor(private router:Router){

  }

  configureRouter(config:RouterConfiguration, router:Router) {
    config.map([
      { route: ['', 'basic'], moduleId: './basic', nav:true, name: 'Basic', title:'Basic' },
      { route: ['sort'], moduleId: './sort', nav:true, name: 'Sort',title:'Sort' },
    ]);

    this.router = router;
  }
}
