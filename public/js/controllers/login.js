(function() {

  function LoginCtrl($log, $rootScope, $window, DeviceLight, Network, Notification) {
    var vm;

    vm = this;

    vm.user = {};
    vm.login = Login;
    vm.SaveUser = SaveUser;

    GetNotification();

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

    function GetNotification() {
      var permission;

      if (Notification.Init() !== 'granted') {
        permission = Notification.GetPermission();

        permission.then(function(permission) {
          if (permission === 'granted') {
            Notification.Create({
              'title': 'Não tem',
              'body': 'Mensagem',
              'icon': 'url'
            });
          }
        })

      } else {
        Notification.Create({
            'title': 'Já tem',
            'body': 'Mensagem',
            'icon': 'url'
          });
      }

    }
  }

  LoginCtrl.$inject = [
    '$log',
    '$rootScope',
    '$window',
    'DeviceLight',
    'Network',
    'Notification'
  ];

  angular
  .module('ChatApp')
  .controller('LoginCtrl', LoginCtrl);

})();
