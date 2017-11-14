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

jQuery('#chatForm').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'USER',
    text: jQuery('[name=message').val()
  }, function() {
    jQuery('[name=message').val('');
  });
});

var locationBtn = jQuery('#sendLocation');
locationBtn.on('click', function() {
  if (!navigator.geolocation) {
    return alert("geolocation not supported");
  }
  navigator.geolocation.getCurrentPosition(function(position) {
  	socket.emit('createLocationMessage', {
  		latitude: position.coords.latitude,
  		longitude: position.coords.longitude
  	});
  	console.log(position);
  }, function(error) {
    alert('Cannot get location');
  })
});
socket.on('newLocationMessage', function(message){
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current Location</a>');
	li.text(`${message.from} : `);
 a.attr('href',message.url);
 li.append(a);
  jQuery('#msgList').append(li);
})