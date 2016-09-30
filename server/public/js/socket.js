//
// Socket
//

var socket, chat_log, system_log, config;

socket = io();

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

socket.on('guest_connected', function(obj) {
  _buildLog(obj);
  SetDataIntoDB(system_log, obj);
});

socket.on('guest_disconnect', function(obj) {
  _buildLog(obj);
  SetDataIntoDB(system_log, obj);
});

socket.on('new_user', function(obj) {
  _buildLog(obj);
  SetDataIntoDB(system_log, obj);
});

socket.on('chat_message', function(obj){
  _buildLog(obj);
  SetDataIntoDB(chat_log, obj);
});
