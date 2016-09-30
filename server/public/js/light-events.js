//
// Ambient Light Events
//

function DeviceLight(event) {
  var light;

  light = event.value;

  if (light <= 10) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

window.addEventListener('devicelight', DeviceLight);
