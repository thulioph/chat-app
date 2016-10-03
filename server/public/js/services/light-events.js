(function() {

  function DeviceLight() {
    return {
      Init: Initialize
    };

    function Initialize(event) {
      var light;

      light = event.value;

      if (light <= 10) {
      return  document.body.classList.add('dark');
      } else {
      return  document.body.classList.remove('dark');
      }
    }

  }

  angular
  .module('ChatApp')
  .service('DeviceLight', DeviceLight);

})();
