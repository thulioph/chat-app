(function() {

  function LoginCtrl($log, $rootScope) {
    var vm;

    vm = this;

    vm.user = {};
    vm.login = Login;
    vm.SaveUser = SaveUser;

    function Login() {
      vm.user.created_at = new Date().getTime()

      vm.SaveUser();
    }

    function SaveUser() {
      $rootScope.User = vm.user;
      $log.info($rootScope.User);
    }
  }

  LoginCtrl.$inject = ['$log', '$rootScope'];

  angular
  .module('ChatApp')
  .controller('LoginCtrl', LoginCtrl);

})();
