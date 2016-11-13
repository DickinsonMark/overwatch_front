(function() {

  `use strict`;

  angular
    .module(`myApp.components.login`, [])
    .controller(`loginController`, loginController);

  loginController.$inject = [`$scope`, `$http`];

  function loginController($scope, $http) {
    /*jshint validthis: true */
    const vm = this;
    vm.username = ``;
    vm.userInfo = null;
    vm.loaded = false;
    vm.error = false;
    vm.profile = {};
    vm.type = `competitive`;
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
          console.log(vm.userInfo);
          $http({
            method: `GET`,
            url: `${baseURL}/profile`
          }).then((profile) => {
            vm.loaded = true;
            vm.profile.player = profile.data.data;
            console.log(profile.data.data);
          });
          $http({
            method: `GET`,
            url: `${baseURL}/${vm.type}/heroes`
          }).then((heroes) => {
            heroes.data = heroes.data.filter((hero) => {
              return hero.playtime !== '--';
            });
            vm.profile.heroes = heroes.data;
            console.log(heroes.data);
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
      $http({
        method: `GET`,
        url: `https://api.lootbox.eu/${vm.userInfo.system}/${vm.userInfo.region}/${vm.userInfo.username}/${vm.type}/heroes`
      }).then((heroes) => {
        heroes.data = heroes.data.filter((hero) => {
          return hero.playtime !== '--';
        });
        vm.profile.heroes = heroes.data;
        console.log(heroes.data);
      })
    }

    function showQuick() {
      vm.type = 'quickplay';
      $http({
        method: `GET`,
        url: `https://api.lootbox.eu/${vm.userInfo.system}/${vm.userInfo.region}/${vm.userInfo.username}/${vm.type}/heroes`
      }).then((heroes) => {
        heroes.data = heroes.data.filter((hero) => {
          return hero.playtime !== '--';
        });
        vm.profile.heroes = heroes.data;
        console.log(heroes.data);
      })
    }
  }

})();
