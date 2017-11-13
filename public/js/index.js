var socket = io();
socket.on('connect', function() {
  console.log("connected to server");
});
socket.on('disconnect', function() {
  console.log('disconnected from server');
});
socket.on('newMessage', function(message) {
  console.log('new message', message);
});
/*socket.on('newUser', function(msg){
	console.log(msg);
});
socket.on('newUserBroadcast', function(msg){
	console.log(msg);
});*/