(function() {

'use strict';

  /**
   * @ngdoc service
   * @name chatAppApp.Firebase
   * @description
   * # Firebase
   * Service in the chatAppApp.
   */

  function Firebase($firebaseObject, $log, $rootScope, $timeout) {
    var Firebase, ref, all_data;

    return Firebase = {
      'init': init,
      'setDb': setDataBase,
      'listenDb': listenDatabase,
      'setItem': setIntoDatabase,
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

    function listenDatabase(db, callback) {
      db.on('value', function(snapshot) {
        $timeout(function() {
          return callback(snapshot.val())
        }, 0);
      });
    }

    function setIntoDatabase(db, obj) {
      Firebase.setDb(db).push(obj).then(function(result) {
        $log.warn('success_setIntoDatabase -> ', result);
      }, function (err) {
        $log.warn('err_setIntoDatabase -> ', err);
      })
    }
  }

  Firebase.$inject = [
    '$firebaseObject',
    '$log',
    '$rootScope',
    '$timeout'
  ];

  angular
  .module('chatAppApp')
  .service('Firebase', Firebase);

})();
