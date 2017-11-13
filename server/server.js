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
	socket.on('disconnect', () =>{
		console.log("User disconnected");
	})
});
app.use(express.static(publicPath));	

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});