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
      // switch (obj.icon) {
      //   case 'log':
      //     obj.icon = '';
      //   break;

      //   case 'url':
      //     obj.icon = '';
      //   break;
      // }

      return new window.Notification(obj.title, {
        body: obj.body,
        icon: '../images/paper-plane.svg'
      });
    }

  }

  angular
  .module('ChatApp')
  .service('Notification', Notification);

})();
