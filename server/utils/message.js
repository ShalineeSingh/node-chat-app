const moment = require('moment')

var generateMessage = (from, text) => {
  var msg = {
    from: from,
    text: text,
    createdAt: moment().valueOf()
  };
  return msg;
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from: from,
    url: 'https://www.google.co.in/maps?q=' + latitude + ',' + longitude,
    createdAt: moment().valueOf()
  }
};
module.exports = {
  generateMessage,
  generateLocationMessage
};