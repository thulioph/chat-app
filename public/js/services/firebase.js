(function() {

  function Firebase(CONFIG) {

    return {
      Init: Initialize,
      Create: SetDatabase,
      Set: SetDataIntoDB,
      Listen: ListenDb
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

    function SetDataIntoDB(db, obj) {
      db.push(obj);
    }

    function ListenDb(db, evt, callback) {
      db.on(evt, function(dataSnapshot) {
        callback(dataSnapshot.val());
      })
    }

  }

  Firebase.$inject = ['CONFIG'];

  angular
  .module('ChatApp')
  .service('Firebase', Firebase);

})();
