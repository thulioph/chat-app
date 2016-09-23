var express = require('express');
var socketIo = require('socket.io');
var path = require('path');

var port = process.env.PORT || 3000;
// var index = (path.join(__dirname, '/client/dist/'), 'index.html');

var fileObj = {
  root: path.join(__dirname, '../client/dist/')
};

var server = express().use(function(req, res) {
  res.sendFile('index.html', fileObj);
}).listen(port, function() {
  console.log('listening on port: ', port);
});

var io = socketIo(server);

io.on('connection', function(socket) {

  // quando um socket é conectado
  var msgObj;

  msg = {
    'timestamp': new Date().getTime(),
    'username': 'Guest'
  };

  io.emit('guest:connected', msg);
  // ====

  // quando um socket é desconectado
  socket.on('disconnect', function() {
    var msgObj;

    msgObj = {
      'timestamp': new Date().getTime(),
      'username': 'Guest'
    };

    io.emit('guest:disconnect', msgObj);
  });
  // ====

  // recebendo o evento de usuário
  socket.on('user:sign_up', function(userData){
    io.emit('user:user_data', userData);
  });
  // ====

  // recebendo o evento de chat message
  socket.on('user:send_message', function(msg){
    io.emit('user:message', msg);
  });
  // ====
});
