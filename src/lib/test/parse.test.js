'use strict';

const parse = require('../parse');
const {TYPE_ERROR, STREET_NAME_NOT_FOUND_ERROR} = require('../errors/error-codes');
const ShipRouteError = require('../errors/ship-route-error');
describe('parse/', () => {
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

    describe('errors/', () => {
      it('throws an error when a number is passed', () => {
        try {
          parse.streetName(12);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [12] not of type string');
        }
      })

      it('throws an error when an array is passed', () => {
        try {
          parse.streetName(['apple', 'sauce']);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [["apple","sauce"]] not of type string');
        }
      })

      it('throws an error when an object is passed', () => {
        try {
          parse.streetName({gary: 'Indiana', length: 12});
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [{"gary":"Indiana","length":12}] not of type string');
        }
      });

      it('throws an error when a street name cannot be found', () => {
        try {
          parse.streetName('')
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(STREET_NAME_NOT_FOUND_ERROR);
          expect(err.message).toBe("Street name not found!");
        }
      });
    })
  });
});