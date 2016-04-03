import {autoinject} from 'aurelia-framework';
import {AppRouterConfig} from './app.router.config';
import {} from '../resources/js/site.js';

@autoinject
export class App {
  mobileMenuActive: boolean = false;
  activeMenuId: string;
  themesVisible: boolean = false;

  constructor(private appRouterConfig: AppRouterConfig){

  }

  activate(){
    this.appRouterConfig.configure();
  }

  toggleMenu(e){
    this.mobileMenuActive = !this.mobileMenuActive;
  }

  changeTheme(event, element) {
    console.dir(event);
    var theme = $(element).data("theme"),
    themeLink = $('link[href$="theme.css"]'),
    newThemeURL =  'node_modules/primeui/themes/' + theme + '/theme.css';

    themeLink.attr('href', newThemeURL);
    return true;
  }
}
