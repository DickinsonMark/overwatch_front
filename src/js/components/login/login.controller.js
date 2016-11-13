(function() {

  'use strict';

  angular
    .module(`myApp.components.login`, [])
    .controller(`loginController`, loginController);

  loginController.$inject = [`$scope`, `$http`];

  function loginController($scope, $http) {
    /*jshint validthis: true */
    const vm = this;
    vm.username = ``;
    vm.type = `competitive`;
    vm.loaded = false;
    vm.error = false;
    vm.profile = {};
    vm.getUser = getUser;
    vm.showComp = showComp;
    vm.showQuick = showQuick;

    function getUser(username) {
      $(`#loginPanel`).css(`display`, `none`);
      $http({
        method: `GET`,
        url: `http://localhost:4567/login/${username}`
      }).then((account) => {
        if (account.data.system && account.data.region && account.data.username) {
          vm.userInfo = account.data;
          const baseURL = `https://api.lootbox.eu/${vm.userInfo.system}/${vm.userInfo.region}/${vm.userInfo.username}`;
          $http({
            method: `GET`,
            url: `${baseURL}/profile`
          }).then((profile) => {
            vm.loaded = true;
            vm.profile.player = profile.data.data;
          });
          $http({
            method: `GET`,
            url: `${baseURL}/competitive/heroes`
          }).then((heroes) => {
            heroes.data = heroes.data.filter((hero) => {
              switch (true) {
                case hero.name.includes('&#xFA;'):
                  hero.name = hero.name.replace('&#xFA;', 'ú');
                  break;
                case hero.name.includes('&#xF6;'):
                  hero.name = hero.name.replace('&#xF6;', 'ö');
                  break;
              }
              return hero.playtime !== '--';
            });
            vm.profile.competitive = heroes.data;
          });
          $http({
            method: `GET`,
            url: `https://api.lootbox.eu/${vm.userInfo.system}/${vm.userInfo.region}/${vm.userInfo.username}/quickplay/heroes`
          }).then((heroes) => {
            heroes.data = heroes.data.filter((hero) => {
              heroes.data = heroes.data.filter((hero) => {
                switch (true) {
                  case hero.name.includes('&#xFA;'):
                    hero.name = hero.name.replace('&#xFA;', 'ú');
                    break;
                  case hero.name.includes('&#xF6;'):
                    hero.name = hero.name.replace('&#xF6;', 'ö');
                    break;
                }
                return hero.playtime !== '--';
              });
              vm.profile.quickplay = heroes.data;
            });
          });
        } else {
          vm.loaded = true;
          vm.error = true;
        }
      }).catch((err) => {
        vm.loaded = true;
        vm.error = true;
      });
    }

    function showComp() {
      vm.type = `competitive`;
    }

    function showQuick() {
      vm.type = `quickplay`;
    }
  }

})();
