//
// Firebase
//

InitFirebase();

function InitFirebase() {
  config = {
    apiKey: "AIzaSyBUPtWSIjrJZaN8O-4SLgj928-FNnjXxWc",
    authDomain: "realtime-chatapp.firebaseapp.com",
    databaseURL: "https://realtime-chatapp.firebaseio.com",
    storageBucket: "realtime-chatapp.appspot.com",
  };

  firebase.initializeApp(config);

  // ====

  chat_log = SetDatabase('chat_log');
  system_log = SetDatabase('system_log');

  // ====

  chat_log.on('value', function(snapshot) {
    console.info('chat_log');
    console.warn(snapshot.val());
  });

  system_log.on('value', function(snapshot) {
    console.info('system_log');
    console.warn(snapshot.val());
  });
}

function SetDatabase(db) {
  return firebase.database().ref(db);
}

function SetDataIntoDB(db, obj) {
  db.push(obj).then(function(result) {
    console.info(result);
    return result;
  }, function(err) {
    console.error(err);
    return err;
  });
}
