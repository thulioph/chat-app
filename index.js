var express, http, path, app, server;

express = require('express');
http = require('http');
path = require('path');

app = express();
app.set('port', process.env.PORT || 8899);

app.use('/js', express.static(path.join(__dirname, '/public/js/')));
app.use('/images', express.static(path.join(__dirname, '/public/images/')));
app.use('/templates', express.static(path.join(__dirname, '/public/views/templates/')));

server = http.createServer(app);

io = require('socket.io').listen(server);

//
// servindo os arquivos
//

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});


//
// Socket
//

io.on('connection', function(socket){
  var msgObj;

  msgObj = {
    'timestamp': new Date().getTime(),
    'msg': 'Um usuário entrou.'
  };

  // quando um usuário se conectar
  io.emit('guest_connected', msgObj)


  // quando um usuário se desconectar
  socket.on('disconnect', function() {
    var obj;

    obj = {
      'timestamp': new Date().getTime(),
      'msg': 'Um usuário saiu.'
    };

    io.emit('guest_disconnect', obj);
  });


  // quando um usuário escrever uma mensagem
  socket.on('chat message', function(msg) {
    io.emit('chat_message', msg);
  });

  // quando um novo usuário entrar
  socket.on('novo_usuario', function(obj) {
    io.emit('new_user', obj);
  })
});


//
// Startando o server
//

server.listen(app.get('port'), function() {
  console.log('Server is running on ', app.get('port'));
});
