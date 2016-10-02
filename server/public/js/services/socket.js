(function() {

  function Socket($log) {

    return {
      Init: Initialize,
      Listen: Listeners
    };

    function Initialize() {
      var chat_log, system_log, config;

      return io();
    }

    function Listeners(socket, evt, callback) {
      socket.on(evt, function(obj){
        return callback(obj);
        // SetDataIntoDB(chat_log, obj);
      });
    }

  }

  Socket.$inject = ['$log'];

  angular
  .module('ChatApp')
  .service('Socket', Socket);

})();
