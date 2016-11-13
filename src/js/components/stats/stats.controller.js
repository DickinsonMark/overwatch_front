(function() {

  'use strict';

  angular
    .module('myApp.components.stats', [])
    .controller('statsController', statsController);

  statsController.$inject = ['$scope'];

  function statsController($scope) {
    /*jshint validthis: true */
    const vm = this;
    vm.greeting = 'Stats';
  }

})();
