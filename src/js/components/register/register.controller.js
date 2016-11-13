(function() {

  'use strict';

  angular
    .module('myApp.components.register', [])
    .controller('registerController', registerController);

  registerController.$inject = ['$scope', '$http'];

  function registerController($scope, $http) {
    /*jshint validthis: true */
    const vm = this;
    vm.form = {};
    vm.systems = [{label: 'Xbox One', value: 'xbl'}, {label: 'PC', value: 'pc'}, {label: 'Playstation 4', value: 'psn'}];
    vm.regions = [{label: 'Europe', value: 'eu'}, {label: 'United States', value: 'us'}, {label: 'Korea', value: 'kr'}, {label: 'China', value: 'cn'}, {label: 'Global', value: 'global'}];
    vm.register = registerUser;

    function registerUser(form) {
      $http({
        method: 'POST',
        url: `http://localhost:4567/register/${form.username}/${form.system}/${form.region}`
      }).then((data) => {
        console.log('success ', data);
      }).catch((err) => {
        console.log('error ', err);
      });
    }
  }

})();
