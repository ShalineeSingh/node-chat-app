const expect = require('expect');
const { isRealString } = require('./../utils/validate');

describe('isRealString', () => {
	it('should reject non string values', () => {
		var string = 1234;
		var res = isRealString(string);
		expect(res).toBe(false);
	});
	it('should reject string with only spaces', () => {
		var string = '     ';
		var res =  isRealString(string);
		expect(res).toBe(false);
		
	});
	it('should allow string with non-space characters', () => {
		var string = 'testign 123';
		var res = isRealString(string);
		expect(res).toBe(true);

	});
});