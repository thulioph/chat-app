(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name chatAppApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the chatAppApp
   */

  function AboutCtrl($rootScope, $location, SocketService) {
    var vm;

    vm = this;
    vm.signUp = signUp;

    vm.form = {};

    Init();

    // ====

    function Init() {
      vm.socket = SocketService.init();
    }

    function signUp() {
      var guest, user;


      if (vm.form.guest) {
        $rootScope.guest = true;

        guest = {
          'username': 'Alguém',
          'timestamp': new Date().getTime()
        };

        dispatch_event(guest);
      } else {
        $rootScope.user = vm.form;

        user = {
          'username': vm.form.username,
          'event': vm.form.event,
          'timestamp': new Date().getTime()
        };

        dispatch_event(user);
      }

      $location.path('/main');
    }

    function dispatch_event(obj) {
      // console.log('novo_usuario ', obj);
      vm.socket.emit('novo_usuario', obj);
    }
  }

  AboutCtrl.$inject = [
    '$rootScope',
    '$location',
    'SocketService'
  ];

  angular
  .module('chatAppApp')
  .controller('AboutCtrl', AboutCtrl);

})();
