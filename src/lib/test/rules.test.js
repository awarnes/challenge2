'use strict';

const {
  commonFactors,
  countConsonants,
  countVowels,
  factorize,
  lengthIsEven
} = require('../rules');
const ShipRouteError = require('../errors/ship-route-error');
const { TYPE_ERROR } = require('../errors/error-codes');

describe('rules/', () => {
  describe('factorize/', () => {
    it('correctly returns array of factors of an even number', () => {
      expect(factorize(24)).toEqual([1, 2, 3, 4, 6, 8, 12, 24]);
    });

    it('correctly returns array of factors of an odd number', () => {
      expect(factorize(35)).toEqual([1, 5, 7, 35]);
    });

    describe('errors/', () => {
      it('throws an error when a string is passed', () => {
        try {
          factorize('Hello!');
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: ["Hello!"] not of type number');
        }
      });

      it('throws an error when an array is passed', () => {
        try {
          factorize(['apple', 'sauce']);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [["apple","sauce"]] not of type number');
        }
      });

      it('throws an error when an object is passed', () => {
        try {
          factorize({ gary: 'Indiana', length: 12 });
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [{"gary":"Indiana","length":12}] not of type number');
        }
      });
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

    describe('errors/', () => {
      it('throws an error when a number is passed', () => {
        try {
          lengthIsEven(12);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [12] not of type string');
        }
      });

      it('throws an error when an array is passed', () => {
        try {
          lengthIsEven(['apple', 'sauce']);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [["apple","sauce"]] not of type string');
        }
      });

      it('throws an error when an object is passed', () => {
        try {
          lengthIsEven({ gary: 'Indiana', length: 12 });
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [{"gary":"Indiana","length":12}] not of type string');
        }
      });
    });
  });

  describe('countConsonants/', () => {
    it('returns the correct number of consonants in a string', () => {
      expect(countConsonants('Gerold')).toBe(4);
    });

    it.skip('returns the correct count of consonants including "Y"', () => {
      expect(countConsonants('Lady Gaga')).toBe(5);
    });

    it('returns the 0 if there are no consonants in a string', () => {
      expect(countConsonants('aaa')).toBe(0);
    });

    describe('errors/', () => {
      it('throws an error when a number is passed', () => {
        try {
          countConsonants(12);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [12] not of type string');
        }
      });

      it('throws an error when an array is passed', () => {
        try {
          countConsonants(['apple', 'sauce']);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [["apple","sauce"]] not of type string');
        }
      });

      it('throws an error when an object is passed', () => {
        try {
          countConsonants({ gary: 'Indiana', length: 12 });
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [{"gary":"Indiana","length":12}] not of type string');
        }
      });
    });
  });

  describe('countVowels/', () => {
    it('returns the correct number of vowels in a string', () => {
      expect(countVowels('Gerold')).toBe(2);
    });

    it.skip('returns the correct count of vowels including "Y"', () => {
      expect(countVowels('Lady Gaga')).toBe(4);
    });

    it('returns the 0 if there are no vowels in a string', () => {
      expect(countVowels('Psst')).toBe(0);
    });

    describe('errors/', () => {
      it('throws an error when a number is passed', () => {
        try {
          countVowels(12);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [12] not of type string');
        }
      });

      it('throws an error when an array is passed', () => {
        try {
          countVowels(['apple', 'sauce']);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [["apple","sauce"]] not of type string');
        }
      });

      it('throws an error when an object is passed', () => {
        try {
          countVowels({ gary: 'Indiana', length: 12 });
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [{"gary":"Indiana","length":12}] not of type string');
        }
      });
    });
  });

  describe('commonFactors/', () => {
    it('returns factors for an even and an odd number', () => {
      expect(commonFactors(24, 37)).toEqual([1]);
    });

    it('returns common factors for two even numbers', () => {
      expect(commonFactors(12, 608)).toEqual([1, 2, 4]);
    });

    it('returns common factors for two odd numbers', () => {
      expect(commonFactors(35, 15)).toEqual([1, 5]);
    });
  });
});
