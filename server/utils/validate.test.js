const expect = require('expect');

var {isRealString} = require('./validate');

describe('isRealString', ()=> {

    it('should reject non-string values', ()=> {
        let nonStringValue = 123;
        let  bValue = isRealString(nonStringValue);
        expect( bValue ).toBe( false );
    });

    it('should reject string with white spaces', ()=> {
        let  stringWithSpaces = '   ';
        expect( isRealString(stringWithSpaces) ).toBe( false );
    });

    it('should allow string with no space chars', ()=> {
        var nonSpaceChaacters = 'f rff';
        expect( isRealString(nonSpaceChaacters) ).toBe( true );
    });
});