//
// Main
//



$('form').submit(function(){
  var obj;

  obj = {
    'user': $('#user').val(),
    'msg': $('#msg').val(),
    'timestamp': new Date().getTime()
  };

  socket.emit('chat message', obj);

  $('#user').val('');
  $('#msg').val('');

  return false;
});
