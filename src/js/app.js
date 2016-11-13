// sample angular code

(function() {

  'use strict';

  angular
    .module('myApp', [
      'myApp.config',
      'ui.materialize',
      'myApp.components.main',
      'myApp.components.register',
      'myApp.components.login',
      'myApp.components.stats',
      'ui.router'
    ]);

})();
