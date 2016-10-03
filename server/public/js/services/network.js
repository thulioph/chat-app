(function() {

  function Network() {

    return {
      Listen: ChangeNetwork
    };

    var network, status;

    network = true;

    function ChangeNetwork(event) {
      status = navigator.onLine ? 'online' : 'offline';

      if (status != 'online') {
        document.body.classList.add('offline');
      } else {
        document.body.classList.remove('offline');
      }
    }
  }

  angular
  .module('ChatApp')
  .service('Network', Network);

})();
