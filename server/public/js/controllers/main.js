(function() {

  function MainCtrl($log, $rootScope, $scope, Socket) {
    var vm, socket;

    vm = this;

    vm.message = '';
    vm.GetUser = GetUser;
    vm.SendMsg = SendMessage;
    vm.SocketListeners = SocketListeners;

    vm.GetUser();

    function GetUser() {
      vm.user_info = $rootScope.User;
      vm.messages = [];

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

    function SocketListeners() {
      Socket.Listen(vm.socket, 'chat_message', function(data) {
        $scope.$apply(function() {
          vm.messages.push(data);
        });
      });

      Socket.Listen(vm.socket, 'guest_connected', function(data) {
        $scope.$apply(function() {
          vm.messages.push(data);
        });
      });

      Socket.Listen(vm.socket, 'guest_disconnect', function(data) {
        $scope.$apply(function() {
          vm.messages.push(data);
        });
      });

      Socket.Listen(vm.socket, 'new_user', function(data) {
        $scope.$apply(function() {
          vm.messages.push(data);
        });
      });
    }

  }

  MainCtrl.$inject = ['$log', '$rootScope', '$scope', 'Socket'];

  angular
  .module('ChatApp')
  .controller('MainCtrl', MainCtrl);

})();
