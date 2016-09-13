(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name chatAppApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the chatAppApp
   */

  angular
    .module('chatAppApp')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$timeout'];

    function MainCtrl($scope, $timeout) {
      var vm;

      vm = this;

      vm.init = initFirebase();
      vm.database = {
        'set': set
      };

      vm.form = {
        submitForm: submitForm
      };

      vm.chat_logs = [];

      // ====

      function initFirebase() {
        console.info('initFirebase');

        var config, database, chat_log;

        config = {
          apiKey: "AIzaSyBUPtWSIjrJZaN8O-4SLgj928-FNnjXxWc",
          authDomain: "realtime-chatapp.firebaseapp.com",
          databaseURL: "https://realtime-chatapp.firebaseio.com",
          storageBucket: "realtime-chatapp.appspot.com",
        };

        firebase.initializeApp(config);
        database = firebase.database();

        vm.chat_log = firebase.database().ref('chat_log/');
        vm.socket = io();

        // $scope.$emit('firebase_ok');

        listenDb();
        listeners();
      }

      function listenDb() {
        console.info('listenDb');

        vm.chat_log.on('value', function(snapshot) {
          console.warn('Houve atualização...', snapshot.val());

          $timeout(function() {
            $scope.$apply(function() {
              vm.chat_logs = snapshot.val();
            })
          }, 10);
        });
      }

      function listeners() {
        console.info('listeners');

        vm.socket.on('chat message', function(msg){
          console.warn('chat message', msg);
        });

        vm.socket.on('user disconnect', function(msg) {
          console.warn('user disconnect', msg);
        })
      }

      function set(db, data, type) {
        console.info('set');

        var obj;

        // check the type of insertion
        if (type === 'chat') {
          obj = {
            'username': data.name,
            'msg': data.msg,
            'event_name': data.event,
            'timestamp': new Date().getTime()
          }
        }

        firebase
        .database()
        .ref(db)
        .push(obj)
        .then(function(data) {
          console.info('inserção finalizada!');
        }, function(err) {
          console.warn('deu erro na inserção! ', err);
        });
      }

      function submitForm() {
        console.info('submitForm');

        vm.database.set('chat_log', vm.form, 'chat');
        vm.socket.emit('send message', vm.form);
        vm.form = {};
      }
    }

})();
