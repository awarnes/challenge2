'use strict';

const {factorize, lengthIsEven, countVowels} = require('../rules');
const ShipRouteError = require('../errors/ship-route-error');
const {TYPE_ERROR} = require('../errors/error-codes');

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
      })

      it('throws an error when an array is passed', () => {
        try {
          factorize(['apple', 'sauce']);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [["apple","sauce"]] not of type number');
        }
      })

      it('throws an error when an object is passed', () => {
        try {
          factorize({gary: 'Indiana', length: 12});
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
      })

      it('throws an error when an array is passed', () => {
        try {
          lengthIsEven(['apple', 'sauce']);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [["apple","sauce"]] not of type string');
        }
      })

      it('throws an error when an object is passed', () => {
        try {
          lengthIsEven({gary: 'Indiana', length: 12});
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
    })

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
      })

      it('throws an error when an array is passed', () => {
        try {
          countVowels(['apple', 'sauce']);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [["apple","sauce"]] not of type string');
        }
      })

      it('throws an error when an object is passed', () => {
        try {
          countVowels({gary: 'Indiana', length: 12});
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [{"gary":"Indiana","length":12}] not of type string');
        }
      });
    });
  });
});