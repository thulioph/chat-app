(function() {

  function Firebase(CONFIG) {

    return {
      Init: Initialize,
      Create: SetDatabase,
      Listen: ListenDatabase,
      Set: SetDataIntoDB
    };

    function Initialize() {
      var config;

      config = {
        apiKey: CONFIG.FIREBASE_KEY,
        authDomain: CONFIG.DOMAIN,
        databaseURL: CONFIG.DB_URL,
        storageBucket: CONFIG.DB_BUCKET
      };

      return firebase.initializeApp(config);
    }

    function SetDatabase(db) {
      return firebase.database().ref(db);
    }

    function ListenDatabase(db, callback) {
      db.on('child_added', function(snapshot) {
        return callback(snapshot.val());
      })
    }

    function SetDataIntoDB(db, obj) {
      db.push(obj).then(function(result) {
        return result;
      }, function(err) {
        return err;
      });
    }

  }

  Firebase.$inject = ['CONFIG'];

  angular
  .module('ChatApp')
  .service('Firebase', Firebase);

})();
