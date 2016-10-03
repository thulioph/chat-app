(function() {

  function Notification() {
    return {
      Init: Initialize,
      GetPermission: GetPermission,
      Create: Create
    };

    function Initialize() {
      return window.Notification.permission;
    }

    function GetPermission(callback) {
      return window.Notification.requestPermission();
    }

    function Create(obj) {
      return new window.Notification(obj.title, {
        body: obj.body,
        icon: obj.icon
      });
    }

  }

  angular
  .module('ChatApp')
  .service('Notification', Notification);

})();
