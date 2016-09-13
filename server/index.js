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
  var msg = 'user connected at ' + new Date();
  io.emit('user connected', msg);

  // quando um socket é desconectado
  socket.on('disconnect', function() {
    var msg = 'user disconnected at ' + new Date();
    io.emit('user disconnect', msg);
  });

  // recebendo o evento de chat message
  socket.on('send message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function() {
  console.log('Server is running on *:3000');
});