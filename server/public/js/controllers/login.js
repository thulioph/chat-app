(function() {

  function LoginCtrl($log, $rootScope, $window, DeviceLight, Network) {
    var vm;

    vm = this;

    vm.user = {};
    vm.login = Login;
    vm.SaveUser = SaveUser;

    // ====

    $window.addEventListener('devicelight', function(e) {
      DeviceLight.Init(e);
    });

    $window.addEventListener('online', function(e) {
      Network.Listen(e);
    });

    $window.addEventListener('offline', function(e) {
      Network.Listen(e);
    });

    // ====

    function Login() {
      vm.user.created_at = new Date().getTime()

      vm.SaveUser();
    }

    function SaveUser() {
      $rootScope.User = vm.user;
      $log.info($rootScope.User);
    }
  }

  LoginCtrl.$inject = [
    '$log',
    '$rootScope',
    '$window',
    'DeviceLight',
    'Network'
  ];

  angular
  .module('ChatApp')
  .controller('LoginCtrl', LoginCtrl);

})();
