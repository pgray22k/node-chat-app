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

describe('generateLocationMessage', ()=> {

    it('should generate correct location message object', ()=> {
        //store res in variable
        //assert from match
        //assert text match
        //assert createdAt is number
        var from = 'And';
        var lat = 1;
        var long = 2;

        var message = generateMessage.generateLocationMessage(from, lat, long);

        expect( (message) => {
            expect( typeof message.createdAt ).toBe('number');
            expect( typeof message.latitude ).toBe('number');
            expect( typeof message.longitude ).toBe('number');
            // expect(message.latitude ).toBe(lat);
            // expect(message.longitude ).toBe(long);

            // expect(message.from ).toBe(from);
            // expect(message.text ).toBe(text);
            //or
            expect(message).toContain({from, lat, long});
        })
    })
});