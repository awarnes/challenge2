const {
  factors,
  lengthIsEven
} = require('../rules');

describe('rules/', () => {
  describe('factors/', () => {
    it('correctly returns array of factors of an even number', () => {
      expect(factors(24)).toEqual([1, 2, 3, 4, 6, 8, 12, 24]);
    });

    it('correctly returns array of factors of an odd number', () => {
      expect(factors(35)).toEqual([1, 5, 7, 35]);
    });

    it('throws an error when a number isn\'t passed', () => {
      expect(factors('Hello!')).toThrow('Error: [Hello!] is not a number.');
    });
  });

  describe('lengthIsEven/', () => {
    it('returns true when string length is even', () => {
      expect(lengthIsEven('Commercial')).toBe(true);
    });

    it('returns false when string length is odd', () => {
      expect(lengthIsEven('Madrona')).toBe(false);
    });

    it('returns true when string length is 0', () => {
      expect(lengthIsEven('')).toBe(true);
    });

    it('throws error when a string isn\'t passed in', () => {
      expect(lengthIsEven(12)).toThrow('Error: [12] is not a string.');
      expect(lengthIsEven(['apple', 'sauce']))
        .toThrow('Error: [[\'apple\', \'sauce\']] is not a string.');
      expect(lengthIsEven({gary: 'Indiana', length: 12}))
        .toThrow('Error: [{gary: \'Indiana\', length: 12}] is not a string.');
    });
  });
});