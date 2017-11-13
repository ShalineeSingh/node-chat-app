const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname + '/../public');
const PORT = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
	console.log('new connection added');
	socket.emit('newMessage' ,{
		from:'Admin',
		'text': "Welcome to the chat room",
		createdAt: new Date().getTime()
	});
	socket.broadcast.emit('newMessage', {
		from:'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
	});
	socket.on('disconnect', () =>{
		console.log("User disconnected");
	});

	socket.on('createMessage', (message) => {
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
		console.log(message);
	});

});
app.use(express.static(publicPath));	

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});