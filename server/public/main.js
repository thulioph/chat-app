var socket = io();

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

socket.on('guest_connected', function(obj) {
  _buildLog(obj);
});

socket.on('guest_disconnect', function(obj) {
  _buildLog(obj);
});

socket.on('new_user', function(obj) {
  _buildLog(obj);
});

socket.on('chat_message', function(obj){
  _buildLog(obj);
});

function _buildLog(obj) {
  console.log(obj);

 var li, div, h4, p, date;

  li = $('<li>');
  div = $('<div class="msg-area">');

  h4 = $('<h4 class="user">').text(obj.user);
  p = $('<p class="message">').text(obj.msg);
  date = $('<span class="date">').text(obj.timestamp);

  (li).append(div);
  (li).append(date);

  (div).append(h4);
  (div).append(p);

  $('#messages').append(li);
}