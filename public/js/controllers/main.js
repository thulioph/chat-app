(function() {

  function MainCtrl($log, $rootScope, $scope, Socket, Firebase) {
    var vm, socket;

    vm = this;

    vm.GetUser = GetUser;

    vm.message = '';
    vm.SendMsg = SendMessage;

    vm.SocketListeners = SocketListeners;

    vm.InitFirebase = InitFirebase;

    // ====

    vm.GetUser();

    // ====

    function GetUser() {
      vm.user_info = $rootScope.User;

      vm.messages = [];

      vm.InitFirebase();

      vm.socket = Socket.Init();
      vm.SocketListeners();

      return false;
    }

    function SendMessage() {
      vm.user_info.message = vm.message;
      vm.user_info.timestamp = new Date().getTime();

      vm.socket.emit('chat message', vm.user_info);

      vm.message = '';
    }

    function InitFirebase() {
      Firebase.Init();

      vm.chat_log = Firebase.Create('chat_log');
      vm.system_log = Firebase.Create('system_log');
      vm.user_entry = Firebase.Create('user_entry');

      FirebaseListeners();
    }

    function SocketListeners() {
      Socket.Listen(vm.socket, 'chat_message', function(data) {
        $scope.$apply(function() {
          vm.messages.push(data);
        });

        Firebase.Set(vm.chat_log, data);
      });

      Socket.Listen(vm.socket, 'guest_connected', function(data) {
        Firebase.Set(vm.system_log, data);
      });

      Socket.Listen(vm.socket, 'guest_disconnect', function(data) {
        Firebase.Set(vm.system_log, data);
      });

      Socket.Listen(vm.socket, 'new_user', function(data) {
        Firebase.Set(vm.user_entry, data);
      });
    }

    function FirebaseListeners() {
      Firebase.Listen(vm.chat_log, 'value', function(data) {
        console.log(data);
        // $scope.$apply(vm.messages.push(data));
      })
    }

  }

  MainCtrl.$inject = [
    '$log',
    '$rootScope',
    '$scope',
    'Socket',
    'Firebase'
  ];

  angular
  .module('ChatApp')
  .controller('MainCtrl', MainCtrl);

})();
