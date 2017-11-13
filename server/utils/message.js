var generateMessage = (from, text) => {
  var msg = {
    from: from,
    text: text,
    createdAt: new Date().getTime()
  };
  return msg;
};

module.exports = {
  generateMessage
};