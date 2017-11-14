const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname + '/../public');
const PORT = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new connection added');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.on('createLocationMessage', (position) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', position.latitude,position.longitude));
  })
  socket.on('disconnect', () => {
    console.log("User disconnected");
  });

  socket.on('createMessage', (msg, callback) => {
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    console.log(msg);
    callback();
  });

});
app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});