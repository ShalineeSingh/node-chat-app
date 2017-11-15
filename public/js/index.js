var socket = io();
function scrollBottom(){
	var messages =jQuery('#msgList');
	var newMsg = messages.children('li:last-child');

	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMsgHeight = newMsg.innerHeight();
	var lastMsgHeight = newMsg.prev().innerHeight();

	if(clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}
socket.on('connect', function() {
  console.log("connected to server");
});
socket.on('disconnect', function() {
  console.log('disconnected from server');
});
socket.on('newMessage', function(message) {
  var time = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: time
  });
  jQuery('#msgList').append(html);
  scrollBottom();
});

jQuery('#chatForm').on('submit', function(e) {
  e.preventDefault();
  var msgTextBox = jQuery('[name=message');
  socket.emit('createMessage', {
    from: 'USER',
    text: msgTextBox.val()
  }, function() {
    msgTextBox.val('');
  });
});

var locationBtn = jQuery('#sendLocation');
locationBtn.on('click', function() {
  if (!navigator.geolocation) {
    return alert("geolocation not supported");
  }
  locationBtn.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationBtn.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    console.log(position);
  }, function(error) {
    alert('Cannot get location');
    locationBtn.removeAttr('disabled').text('Send location');

  })
});
socket.on('newLocationMessage', function(message) {
  var time = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location_template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: time
  });
  jQuery('#msgList').append(html);
  scrollBottom();
})