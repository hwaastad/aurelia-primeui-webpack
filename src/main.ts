import {Aurelia} from 'aurelia-framework';
import {bootstrap} from 'aurelia-bootstrapper-webpack';

//import 'prime-css/themes/delta/theme.css';
import 'font-awesome/css/font-awesome.css';

/*import '../resources/css/jquery-ui.css';
import '../resources/css/quill.snow.css';
import 'prime-css/primeui-ng-all.css';*/

import '../resources/css/site.css';

import 'jqueryui';
import 'jquery';

bootstrap((aurelia: Aurelia): void => {
  aurelia.use
  .standardConfiguration()
  .developmentLogging()
  .feature('feature')
  aurelia.start().then(() => aurelia.setRoot('app', document.body));
});
