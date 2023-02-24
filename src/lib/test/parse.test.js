'use strict';

const parse = require('../parse');

describe.skip('parse/', () => {
  describe('streetName/', () => {
    it('returns the street name from a simple address string', () => {
      expect(parse.streetName('123 Fake St')).toEqual('Fake');
    });

    it('returns the street name from a complex address string', () => {
      expect(parse.streetName('123 Lucifer Lane, Portland, OR 92123')).toEqual('Lucifer');
    });

    it('returns the street name from an address with apartment string', () => {
      expect(parse.streetName('123 False Portal Avenue Apt C, Luna, NM 87120')).toEqual('False Portal');
    });
  });
});

/**
 * 8542 Glen Eagles Ave.
Moncks Corner, SC 29461

47 Brook Drive
Riverside, NJ 08075

428 Prince Avenue
Jamaica, NY 11432

7173 South Sherwood Dr.
Gloucester, MA 01930

7818 Jockey Hollow Dr.
Quakertown, PA 18951

93 Carriage Road
Pasadena, MD 21122
 */