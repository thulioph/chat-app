(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name chatAppApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the chatAppApp
   */

  angular
    .module('chatAppApp')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$log', '$rootScope', '$timeout', 'SocketService', 'Firebase'];

    function MainCtrl($scope, $log, $rootScope, $timeout, SocketService, Firebase) {
      var vm;

      vm = this;

      vm.signUp = userSignUp;
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
        vm.socket = SocketService.init();

        initDb();
        listenSocket()
      }

      function initDb() {
        var chat_log, system_log, user_entry;

        chat_log = Firebase.setDb('chat_log');
        system_log = Firebase.setDb('system_log');
        user_entry = Firebase.setDb('user_entry');

        vm.listenDb(chat_log);
        vm.listenDb(system_log);
        vm.listenDb(user_entry);
      }

      function listenDb(db) {
        Firebase.listenDb(db, function(result) {
          $log.warn('db -> ', result);
        });
      }

      function listenSocket() {
        vm.socket.on('user:message', function(data) {
          Firebase.setItem('chat_log', data);
        });

        vm.socket.on('user:user_data', function(data) {
          Firebase.setItem('user_entry', data);
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
          'event': vm.form.event,
          'username': vm.form.username,
          'message': vm.message,
          'timestamp': new Date().getTime()
        };

        vm.socket.emit('user:send_message', obj);
      }
    }

})();
