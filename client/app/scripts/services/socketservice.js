(function() {

  'use strict';

  /**
   * @ngdoc service
   * @name chatAppApp.SocketService
   * @description
   * # SocketService
   * Factory in the chatAppApp.
   */

  function SocketService($log) {
    var SocketService;

    return SocketService = {
      'init': init
    }

    function init() {
      return io.connect();
    }
  }

  SocketService.$inject = ['$log'];

  angular
  .module('chatAppApp')
  .factory('SocketService', SocketService);

})();
