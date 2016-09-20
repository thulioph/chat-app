(function() {

'use strict';

  /**
   * @ngdoc service
   * @name chatAppApp.Firebase
   * @description
   * # Firebase
   * Service in the chatAppApp.
   */

  angular
  .module('chatAppApp')
  .service('Firebase', Firebase);

  Firebase.$inject = ['$firebaseObject', '$log'];

  function Firebase($firebaseObject, $log) {
    var Firebase, ref, all_data;

    return Firebase = {
      'getAllData': _getAllData()
    }

    function _getAllData() {
      ref = new Firebase('https://157.firebaseio.com');

      all_data = $firebaseObject(ref);
      $log.warn('all_data', all_data)

      return all_data;
    }
  }

})();
