(function() {

  var network, status;

  network = true;

  function ChangeNetwork(event) {
    console.info(event.timeStamp);

    status = navigator.onLine ? 'online' : 'offline';

    if (status != 'online') {
      document.body.classList.add('offline');
    } else {
      document.body.classList.remove('offline');
    }
  }

  window.addEventListener('online', ChangeNetwork);
  window.addEventListener('offline', ChangeNetwork);

})();
