const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { isRealString } = require('./utils/validate');
const { Users } = require('./utils/users');

const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname + '/../public');
const PORT = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
  socket.on('createLocationMessage', (position) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', position.latitude, position.longitude));
  })
  socket.on('disconnect', () => {
  	var user = users.removeUser(socket.id);
  	if(user){
  		io.to(user.room).emit('updateUserList', users.getUserList(user.room));
  		io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
  	}
  });
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))
    callback();

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