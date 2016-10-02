(function() {

  function MainCtrl($log) {
    var vm;

    vm = this;

    vm.hello = 'main';
  }

  MainCtrl.$inject = ['$log'];

  angular
  .module('ChatApp')
  .controller('MainCtrl', MainCtrl);

})();
