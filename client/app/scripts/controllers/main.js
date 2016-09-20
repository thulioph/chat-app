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

      vm.submitForm = submitForm;
      vm.listenDb = listenDb;

      vm.form = {};

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
        var chat_log, system_log;

        chat_log = Firebase.setDb('chat_log');
        system_log = Firebase.setDb('system_log');

        vm.listenDb(chat_log);
        vm.listenDb(system_log);
      }

      function listenDb(db) {
        Firebase.listenDb(db, function(result) {
          $log.warn('db -> ', result);
        });
      }

      function listenSocket() {
        vm.socket.on('chat message', function(msg) {
          var obj;

          obj = {
            'message': msg,
            'username': vm.form.username,
            'event': vm.form.event,
            'timestamp': new Date().getTime()
          };

          Firebase.setItem('system_log', obj);
        });

        vm.socket.on('user disconnect', function(msg) {
          var obj;

          obj = {
            'message': msg,
            'timestamp': new Date().getTime()
          };

          Firebase.setItem('system_log', obj);
        });

        vm.socket.on('user connected', function(msg) {
          var obj;

          obj = {
            'message': msg,
            'timestamp': new Date().getTime()
          };

          Firebase.setItem('system_log', obj);
        });
      }

      function submitForm() {
        console.warn('vm.form', vm.form);
        // vm.socket.emit('send message', vm.form);
      }
    }

})();
