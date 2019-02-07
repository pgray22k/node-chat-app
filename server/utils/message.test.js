var expect = require('expect');

var generateMessage = require('./message');

describe('generateMessage', ()=> {

    it('should generate correct message object', ()=> {
        //store res in variable
        //assert from match
        //assert text match
        //assert createdAt is number
        var from = 'And';
        var text = 'Some message';

        var message = generateMessage.generateMessage(from, text);

        expect( (message) => {
            expect( typeof message.createdAt ).toBe('number');
            // expect(message.from ).toBe(from);
            // expect(message.text ).toBe(text);
            //or
            expect(message).toContain({from, text});
        })
    })
});