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
      vm.system_logs = [];

      // ====

      function initFirebase() {
        var config, database;

        config = {
          apiKey: "AIzaSyBUPtWSIjrJZaN8O-4SLgj928-FNnjXxWc",
          authDomain: "realtime-chatapp.firebaseapp.com",
          databaseURL: "https://realtime-chatapp.firebaseio.com",
          storageBucket: "realtime-chatapp.appspot.com",
        };

        firebase.initializeApp(config);
        database = firebase.database();

        vm.chat_log = firebase.database().ref('chat_log');
        vm.system_log = firebase.database().ref('system_log');
        vm.socket = io();

        listenDb();
        listeners();
      }

      function listenDb() {
        vm.chat_log.on('value', function(snapshot) {
          $timeout(function() {
            $scope.$apply(function() {
              vm.chat_logs = snapshot.val();
            })
          }, 10);
        });

        vm.system_log.on('value', function(snapshot) {
          $timeout(function() {
            $scope.$apply(function() {
              vm.system_logs = snapshot.val();
            })
          }, 10);
        });
      }

      function listeners() {
        vm.socket.on('chat message', function(msg) {
          vm.database.set('chat_log', msg, 'chat');
        });

        vm.socket.on('user disconnect', function(msg) {
          vm.database.set('system_log', msg, 'log');
        });

        vm.socket.on('user connected', function(msg) {
          vm.database.set('system_log', msg, 'log');
        });
      }

      function set(db, data, type) {
        var obj;

        // check the type of insertion
        if (type === 'chat') {
          obj = {
            'username': data.name,
            'message': data.msg,
            'event': data.event,
            'timestamp': new Date().getTime()
          }
        } else {
          obj = {
            'message': data
          }
        }

        firebase
        .database()
        .ref(db)
        .push(obj)
        .then(function(data) {
          console.info('rolou alteração!');
        }, function(err) {
          console.warn('deu erro na inserção! ', err);
        });
      }

      function submitForm() {
        vm.socket.emit('send message', vm.form);
        vm.form = {};
      }
    }

})();
