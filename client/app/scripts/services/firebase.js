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

  Firebase.$inject = ['$firebaseObject'];

  function Firebase($firebaseObject) {
    var Firebase, ref, all_data;

    return Firebase = {
      'getAllData': _getAllData()
    }

    function _getAllData() {
      ref = new Firebase('https://157.firebaseio.com');

      all_data = $firebaseObject(ref);
      console.warn('all_data', all_data)

      return all_data;
    }
  }

})();
