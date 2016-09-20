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

      vm.form = {};

      vm.chat_logs = [];
      vm.system_logs = [];

      Init();

      // ====

      function Init() {
        Firebase.init();
        initDb();
      }

      function initDb() {
        $log.info('initDb');

        var chat_log, system_log;

        chat_log = Firebase.setDb('chat_log');
        system_log = Firebase.setDb('system_log');

        Firebase.listenDb(chat_log, function(result) {
          $log.warn('chat_log -> ', result);
        });

        Firebase.listenDb(system_log, function(result) {
          $log.warn('system_log -> ', result);
        });

        return;

        SocketService.init();
        listeners();
      }

      function listeners() {
        $log.info('listeners');

        vm.socket.on('chat message', function(msg) {
          vm.database.set('chat_log', msg, 'chat');
        });

        vm.socket.on('user disconnect', function(msg) {
          vm.database.set('system_log', msg, 'log');
        });

        vm.socket.on('user connected', function(msg) {
          vm.database.set('system_log', msg, 'log');
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
