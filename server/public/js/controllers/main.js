(function() {

  function MainCtrl($log, $rootScope) {
    var vm;

    vm = this;

    vm.message = '';
    vm.GetUser = GetUser;
    vm.SendMsg = SendMessage;

    vm.GetUser();

    function GetUser() {
      vm.user_info = $rootScope.User;
      return false;
    }

    function SendMessage() {
      vm.user_info.message = vm.message;
      vm.user_info.timestamp = new Date().getTime();

      socket.emit('chat message', vm.user_info);

      vm.message = '';
    }
  }

  MainCtrl.$inject = ['$log', '$rootScope'];

  angular
  .module('ChatApp')
  .controller('MainCtrl', MainCtrl);

})();
