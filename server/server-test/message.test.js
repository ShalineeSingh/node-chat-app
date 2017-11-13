const expect = require('expect');
var { generateMessage } = require('./../utils/message');

describe('Generate message', () => {
  it('should generate the correct message', () => {
  	var object = {
  		from: "me@123.com",
  		text: "yes, I'm here!"
  	};
  	var res = generateMessage(object.from, object.text);
  	console.log(res);
  	expect(res.createdAt).toBeA('number');
  	
  	expect(res.from).toBe(object.from)
  	expect(res.text).toBe(object.text)
  })
});