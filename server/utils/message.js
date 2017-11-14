var generateMessage = (from, text) => {
  var msg = {
    from: from,
    text: text,
    createdAt: new Date().getTime()
  };
  return msg;
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from: from,
    url: 'https://www.google.co.in/maps?q=' + latitude + ',' + longitude,
    createdAt: new Date().getTime()
  }
};
module.exports = {
  generateMessage,
  generateLocationMessage
};