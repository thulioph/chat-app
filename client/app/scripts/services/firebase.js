(function() {

'use strict';

  /**
   * @ngdoc service
   * @name chatAppApp.Firebase
   * @description
   * # Firebase
   * Service in the chatAppApp.
   */

  function Firebase($firebaseObject, $log, $rootScope) {
    var Firebase, ref, all_data;

    return Firebase = {
      'init': init,
      'setDb': setDataBase,
      // 'getAllData': _getAllData()
    }

    // ====

    function init() {
      var config;

      config = {
        apiKey: "AIzaSyBUPtWSIjrJZaN8O-4SLgj928-FNnjXxWc",
        authDomain: "realtime-chatapp.firebaseapp.com",
        databaseURL: "https://realtime-chatapp.firebaseio.com",
        storageBucket: "realtime-chatapp.appspot.com",
      };

      firebase.initializeApp(config);
    }

    function setDataBase(db) {
      return firebase.database().ref(db);
    }

    function _getAllData() {
      ref = new Firebase('https://157.firebaseio.com');

      all_data = $firebaseObject(ref);
      $log.warn('all_data', all_data)

      return all_data;
    }
  }

  Firebase.$inject = ['$firebaseObject', '$log', '$rootScope'];

  angular
  .module('chatAppApp')
  .service('Firebase', Firebase);

})();
