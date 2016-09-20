(function() {

  'use strict';

  /**
   * @ngdoc service
   * @name chatAppApp.SocketService
   * @description
   * # SocketService
   * Factory in the chatAppApp.
   */

  angular
  .module('chatAppApp')
  .factory('SocketService', SocketService);

  SocketService.$inject = ['$log'];

  function SocketService($log) {
    var SocketService;

    return SocketService = {
      'get': _get
    }

    function _get() {
      return $log.warn('DALE!');
    }
  }

})();
