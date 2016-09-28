(function() {

  'use strict';

  /**
   * @ngdoc service
   * @name chatAppApp.SocketService
   * @description
   * # SocketService
   * Factory in the chatAppApp.
   */

  function SocketService($rootScope) {
    var SocketService;

    return SocketService = {
      'init': init
    }

    // ====

    function init() {
      return io();

      $rootScope.socket_init = true;
    }
  }

  SocketService.$inject = ['$rootScope'];

  angular
  .module('chatAppApp')
  .service('SocketService', SocketService);

})();
