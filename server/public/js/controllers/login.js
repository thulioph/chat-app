(function() {

  function LoginCtrl($log) {
    var vm;

    vm = this;

    vm.hello = 'login';
  }

  LoginCtrl.$inject = ['$log'];

  angular
  .module('ChatApp')
  .controller('LoginCtrl', LoginCtrl);

})();
