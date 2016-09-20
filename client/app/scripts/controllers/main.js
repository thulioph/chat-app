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

      vm.socket;

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
          $log.warn('chat message -> ', msg);
          // vm.database.set('chat_log', msg, 'chat');
        });

        vm.socket.on('user disconnect', function(msg) {
          $log.warn('user disconnect -> ', msg);
          // vm.database.set('system_log', msg, 'log');
        });

        vm.socket.on('user connected', function(msg) {
          $log.warn('user connected -> ', msg);
          // vm.database.set('system_log', msg, 'log');
        });
      }

      function set(db, data, type) {
        var obj;

        // check the type of insertion
        if (type === 'chat') {
          obj = {
            'username': data.name,
            'message': data.msg,
            'event': data.event,
            'timestamp': new Date().getTime()
          }
        } else {
          obj = {
            'message': data
          }
        }

        firebase
        .database()
        .ref(db)
        .push(obj)
        .then(function(data) {
          console.info('rolou alteração!');
        }, function(err) {
          console.warn('deu erro na inserção! ', err);
        });
      }

      function submitForm() {
        console.warn('vm.form', vm.form);
        // vm.socket.emit('send message', vm.form);
      }
    }

})();
