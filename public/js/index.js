var socket = io();
socket.on('connect', function() {
  console.log("connected to server");
});
socket.on('disconnect', function() {
  console.log('disconnected from server');
});
socket.on('newMessage', function(message) {
  console.log('new message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#msgList').append(li);
});
/*socket.emit('createMessage', {
  from: "shalinee",
  text: "from clients"
}, function() {
  console.log("got it");
});*/

jQuery('#chatForm').on('submit', function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		from:'USER',
		text: jQuery('[name=message').val()
	}, function(){
		jQuery('[name=message').val('');
	});
});