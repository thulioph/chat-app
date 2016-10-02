(function() {


  var obj;

  obj = {
    'FIREBASE_KEY': 'AIzaSyBUPtWSIjrJZaN8O',
    'DOMAIN': 'realtime-chatapp.firebaseapp.com',
    'DB_URL': 'https://realtime-chatapp.firebaseio.com',
    'DB_BUCKET': 'realtime-chatapp.appspot.com'
  };

  angular
  .module('ChatApp')
  .constant('CONFIG', obj);

})();
