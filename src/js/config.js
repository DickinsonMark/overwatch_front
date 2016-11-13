(function() {

  'use strict';

  angular.module(`myApp.config`, [`ui.router`])
    .config(appConfig)
    .run(function($templateCache) {
      $templateCache.removeAll();
    });

  function appConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise(`/`);
    $stateProvider.state(`home`, {
      url: `/`,
      templateUrl: `js/components/main/main.view.html`,
      controller: `mainController`,
      controllerAs: `mainCtrl`
    }).state(`register`, {
      url: `/register`,
      templateUrl: `js/components/register/register.view.html`,
      controller: `registerController`,
      controllerAs: `registerCtrl`
    }).state(`login`, {
      url: `/login`,
      templateUrl: `js/components/login/login.view.html`,
      controller: `loginController`,
      controllerAs: `loginCtrl`
    }).state(`login.profile`, {
      templateUrl: `js/components/login/partials/_UserProfile.html`
    }).state(`login.hero`, {
      templateUrl: `js/components/login/partials/_hero.html`
    });
  }
})();
