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

    vm.listenDb = listenDb;

    vm.form = {};
    vm.message;

    vm.chat_logs = [];
    vm.system_logs = [];

    Init();

    // ====

    function Init() {
      Firebase.init();

      vm.user = $rootScope.user;

      vm.socket = SocketService.init();

      initDb();
      listenSocket();
    }

    function initDb() {
      var chat_log, system_log, user_entry;

      // chat_log = Firebase.setDb('chat_log');
      // system_log = Firebase.setDb('system_log');
      user_entry = Firebase.setDb('user_entry');

      // vm.listenDb(chat_log);
      // vm.listenDb(system_log);
      vm.listenDb(user_entry);
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

      vm.socket.on('novo_usuario', function(data) {
        console.log('novo_usuario');
        // Firebase.setItem('user_entry', data);
      });

      vm.socket.on('guest:disconnect', function(data) {
        Firebase.setItem('system_log', data);
      });

      vm.socket.on('guest:connected', function(data) {
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
  }

  angular
  .module('chatAppApp')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$log', '$rootScope', '$timeout', 'SocketService', 'Firebase'];

})();
