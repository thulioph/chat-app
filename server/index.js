var express, app, http, io;

express = require('express');
app = express();
http = require('http').Server(app);
io = require('socket.io')(http);

// app.use(express.static(__dirname + '/../client/dist'));

app.get('/', function(req, res) {
  // res.sendFile(__dirname + '/../client/dist/index.html');
  res.sendFile(__dirname + '/public/index.html');
});

// Gerenciando eventos
io.on('connection', function(socket){
  var msgObj;

  msgObj = {
    'timestamp': new Date().getTime(),
    'username': 'Guest'
  };

  // quando um usuário se conectar
  io.emit('guest_connected', msgObj)


  // quando um usuário se desconectar
  socket.on('disconnect', function() {
    var obj;

    obj = {
      'timestamp': new Date().getTime(),
      'username': 'Guest'
    };

    io.emit('guest_disconnect', obj);
  });


  // quando um usuário escrever uma mensagem
  socket.on('chat message', function(msg) {
    io.emit('chat_message', msg);
  });
});

http.listen(3000, function() {
  console.log('Server is running on *:3000');
});