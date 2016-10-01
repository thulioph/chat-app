(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name chatAppApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the chatAppApp
   */

  function MainCtrl($scope, $log, $rootScope, $timeout, SocketService, Firebase) {
    var vm;

    vm = this;

    vm.submitForm = submitForm;
    vm.logout = logout;

    vm.listenDb = listenDb;

    vm.form = {};
    vm.message;

    vm.chat_logs = [];
    vm.system_logs = [];

    // Init();

    // ====

    function Init() {
      vm.user = $rootScope.user;

      // checa se o socket já foi iniciado
      if (!$rootScope.socket_init) {
        vm.socket = SocketService.init();
      }

      listenSocket();

      // checa se o firebase já foi iniciado
      if (!$rootScope.firebase_init) {
        Firebase.init();
      }

      initDb();
    }

    function initDb() {
      var chat_log, system_log;

      // chat_log = Firebase.setDb('chat_log');
      system_log = Firebase.setDb('system_log');

      // vm.listenDb(chat_log);
      vm.listenDb(system_log);
    }

    function listenDb(db) {
      // a cada alteração no banco, exibo aqui!
      Firebase.listenDb(db, function(result) {
        $log.warn('db -> ', result);
      });
    }

    function listenSocket() {
      vm.socket.on('user:message', function(data) {
        Firebase.setItem('chat_log', data);
      });

      vm.socket.on('guest_connected', function(data) {
        Firebase.setItem('system_log', data);
      });

      vm.socket.on('guest_disconnect', function(data) {
        Firebase.setItem('system_log', data);
      });
    }

    function userSignUp() {
      var obj;

      obj = {
        'event': vm.form.event,
        'username': vm.form.username,
        'timestamp': new Date().getTime()
      };

      vm.socket.emit('user:sign_up', obj);
    }

    function submitForm() {
      var obj;

      obj = {
        'event': vm.user.event,
        'username': vm.user.username,
        'message': vm.message,
        'timestamp': new Date().getTime()
      };

      console.log('DALE -> ', obj);
      vm.message = '';
      // vm.socket.emit('user:send_message', obj);
    }

    function logout() {
      return history.back();
    }
  }

  MainCtrl.$inject = [
    '$scope',
    '$log',
    '$rootScope',
    '$timeout',
    'SocketService',
    'Firebase'
  ];

  angular
  .module('chatAppApp')
  .controller('MainCtrl', MainCtrl);

})();
