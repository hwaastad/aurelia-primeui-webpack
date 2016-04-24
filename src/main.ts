import {Aurelia} from 'aurelia-framework';
import {bootstrap} from 'aurelia-bootstrapper-webpack';

//import 'primeui/themes/delta/theme.css';
//import 'font-awesome/css/font-awesome.css';

/*import '../resources/css/jquery-ui.css';
import '../resources/css/quill.snow.css';
import 'prime-css/primeui-ng-all.css';*/

//import '../resources/css/site.css';
//import 'chart.js';
import 'jqueryui';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
//import 'jquery';
//import 'primeui';


bootstrap((aurelia: Aurelia): void => {
  aurelia.use
  .standardConfiguration()
  .developmentLogging()
  .feature('feature')
  aurelia.start().then(() => aurelia.setRoot('app', document.body));
});
