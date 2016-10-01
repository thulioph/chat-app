(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name chatAppApp.controller:ChatCtrl
   * @description
   * # ChatCtrl
   * Controller of the chatAppApp
   */

  function ChatCtrl($rootScope, $location, SocketService, Firebase) {
    var vm;

    vm = this;
    vm.signUp = signUp;

    vm.form = {};

    vm.users_total = [];

    var counter = 0;

    Init();

    // ====


    function Init() {
      console.info('Init', counter++);

      // checa se o socket já foi iniciado
      if (!$rootScope.socket_init) {
        vm.socket = SocketService.init();
        listenSocket();
      }

      // checa se o firebase já foi iniciado
      if (!$rootScope.firebase_init) {
        Firebase.init();
        initDb();
      }
    }

    function initDb() {
      var user_entry;

      user_entry = Firebase.setDb('user_entry');

      listenDb(user_entry);
    }

    function listenDb(db) {
      Firebase.listenDb(db, function(result) {
        if (result !== null) {
          // console.warn('Atualizações no DB ', result);
          vm.users_total.push(result);
        }
      });
    }

    function signUp() {
      var guest, user;

      return $location.path('/chat/online');

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

    // dispara um evento informando que um novo usuário está conectado
    function dispatch_event(obj) {
      vm.socket.emit('novo_usuario', obj);
    }

    // escutando os eventos de usuário conectado
    function listenSocket() {
      vm.socket.on('new_user', function(data) {
        Firebase.setItem('user_entry', data);
      });
    }
  }

  ChatCtrl.$inject = [
    '$rootScope',
    '$location',
    'SocketService',
    'Firebase'
  ];

  angular
  .module('chatAppApp')
  .controller('ChatCtrl', ChatCtrl);

})();
