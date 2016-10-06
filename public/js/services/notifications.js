(function() {

  function Notification() {
    return {
      Init: Initialize,
      GetPermission: GetPermission,
      Create: Create
    };

    function Initialize() {
      if (!("Notification" in window)) {
        alert("Seu navegador, não suporta notificações!");
      } else {
        return window.Notification.permission;
      }
    }

    function GetPermission(callback) {
      return window.Notification.requestPermission();
    }

    function Create(obj) {
      return new window.Notification(obj.title, {
        body: obj.body,
        icon: 'https://www.iconfinder.com/icons/353434/download/png/48'
      });
    }

  }

  angular
  .module('ChatApp')
  .service('Notification', Notification);

})();
