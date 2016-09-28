(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name chatAppApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the chatAppApp
   */

  function AboutCtrl($rootScope, $location) {
    var vm;

    vm = this;
    vm.signUp = signUp;

    vm.form = {};

    // ====

    function signUp() {
      if (vm.form.guest) {
        $rootScope.guest = true;
      } else {
        $rootScope.user = vm.form;
      }

      $location.path('/main');
    }
  }

  angular
  .module('chatAppApp')
  .controller('AboutCtrl', AboutCtrl);

  AboutCtrl.$inject = ['$rootScope', '$location'];

})();
