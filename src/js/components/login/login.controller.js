(function() {

  'use strict';

  angular.module(`myApp.components.login`, [])
    .controller(`loginController`, loginController);

  loginController.$inject = [`$scope`, `$http`];

  function loginController($scope, $http) {
    /*jshint validthis: true */
    const vm = this;
    vm.username = ``;
    vm.userInfo = {};
    vm.heroInfo = {};
    vm.type = `competitive`;
    vm.hero = ``;
    vm.loaded = false;
    vm.heroLoaded = false;
    vm.error = false;
    vm.profile = {};
    vm.getUser = getUser;
    vm.showComp = showComp;
    vm.showQuick = showQuick;
    vm.heroClick = heroClick;

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

    function heroClick(heroName) {
      switch (true) {
        case heroName === `Torbjörn`:
          vm.hero = `Torbjoern`;
          break;
        case heroName === `Lúcio`:
          vm.hero = `Lucio`;
          break;
        case heroName === `Soldier: 76`:
          vm.hero = `Soldier76`;
          break;
        case heroName === `D.Va`:
          vm.hero = `DVa`;
          break;
        default:
          vm.hero = heroName;
      }
      $http({
        method: `GET`,
        url: `https://api.lootbox.eu/${vm.userInfo.system}/${vm.userInfo.region}/${vm.userInfo.username}/${vm.type}/hero/${vm.hero}/`
      }).then((data) => {
        vm.heroLoaded = true;
        vm.heroInfo = data.data[vm.hero];
        switch (true) {
          case heroName === `Torbjoern`:
            vm.hero = `Torbjörn`;
            break;
          case heroName === `Lucio`:
            vm.hero = `Lúcio`;
            break;
          case heroName === `Soldier76`:
            vm.hero = `Soldier: 76`;
            break;
          case heroName === `DVa`:
            vm.hero = `D.Va`;
            break;
          default:
            vm.hero = heroName;
        }
      }).catch((err) => {
        vm.heroLoaded = true;
        vm.error = true;
      });
    }
  }

})();
