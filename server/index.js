var app, http, path, io;

app = require('express')();
http = require('http').Server(app);
path = require('path');
io = require('socket.io')(http);

app.get('/', function(req, res) {
  var fileObj;

  fileObj = {
    root: path.join(__dirname, 'public')
  };

  res.sendFile('index.html', fileObj);
});

io.on('connection', function(socket) {
  // enviar essas informações pro backend
  console.log('an user connected ' + new Date());

  // quando um socket é desconectado
  // enviar essas informações pro backend
  socket.on('disconnect', function() {
    console.log('an user disconnected ' + new Date());

    var msg = 'an user disconnected ' + new Date();
    io.emit('user disconnect', msg);
  });

  // recebendo o evento de chat message
  socket.on('send message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(3000, function() {
  console.log('Server is running on *:3000');
});