const expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./../utils/message');

describe('Generate message', () => {
  it('should generate the correct message', () => {
    var object = {
      from: "me@123.com",
      text: "yes, I'm here!"
    };
    var res = generateMessage(object.from, object.text);
    expect(res.createdAt).toBeA('number');

    expect(res.from).toBe(object.from)
    expect(res.text).toBe(object.text)
  })
});

describe('Generate location message', () => {
	it('should generate correct location message', () => {
		var location = {
			from: "User",
			latitude: 2,
			longitude:1
		};
		var res = generateLocationMessage(location.from, location.latitude, location.longitude);

		expect(res.from).toBe(location.from)
		expect(res.url).toBe('https://www.google.co.in/maps?q=2,1')
		expect(res.createdAt).toBeA('number')
	})

})