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
  console.info('O servidor ouviu o evento de connection.');

  var msgObj;

  msgObj = {
    'timestamp': new Date().getTime(),
    'msg': 'Um usuário entrou.'
  };

  // quando um usuário se conectar
  io.emit('guest_connected', msgObj)


  // quando um usuário se desconectar
  socket.on('disconnect', function() {
    console.info('O servidor ouviu o evento de disconnect.');

    var obj;

    obj = {
      'timestamp': new Date().getTime(),
      'msg': 'Um usuário saiu.'
    };

    io.emit('guest_disconnect', obj);
  });


  // quando um usuário escrever uma mensagem
  socket.on('chat message', function(msg) {
    console.info('O servidor ouviu o evento de chat_message.');
    io.emit('chat_message', msg);
  });

  // quando um novo usuário entrar
  socket.on('novo_usuario', function(obj) {
    console.info('O servidor ouviu o evento de novo_usuario.');
    io.emit('new_user', obj);
  })
});

http.listen(3000, function() {
  console.log('Server is running on *:3000');
});