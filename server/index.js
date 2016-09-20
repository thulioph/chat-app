var express, app, http, path, io;

express = require('express');
app = express();
http = require('http').Server(app);
path = require('path');
io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', function(req, res) {
  var fileObj;

  fileObj = {
    root: path.join(__dirname, '../client/dist/') // /public
  };

  res.sendFile('index.html', fileObj);
});

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

http.listen(3000, function() {
  console.log('Server is running on *:3000');
});