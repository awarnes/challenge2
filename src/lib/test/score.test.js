'use strict';

const { mapJobs, score } = require('../score');
// const ShipRouteError = require('../errors/ship-route-error');
// const {TYPE_ERROR} = require('../errors/error-codes');

describe('score/', () => {
  describe('score/', () => {
    it('calculates the right score given an odd length and no common factors', () => {
      expect(score('Gary', '421 Blu Ave')).toBe(3);
    });

    it('calculates the right score given an even length and no common factors', () => {
      expect(score('May', '123 Fake St')).toBe(1.5);
    });

    it('calculates the right score given an odd length and any common factors', () => {
      expect(score('Gerrold Alfred Pingwillow the Third', '1294 Peoples Drive')).toBe(33);
    });

    it('calculates the right score given an even length and any common factors', () => {
      expect(score('Maybelle Car', '123 Set Hall Road')).toBe(9);
    });
  });

  describe('mapJobs/', () => {
    it('properly maps driver and destination scores', () => {
      const drivers = ['apple', 'sauce', 'pork', 'chops'];
      const destinations = [
        '123 Fake St',
        '456 Paddington Way',
        '789 Turtle Dove Lane',
        '1011 Billboard Ave'
      ];

      expect(mapJobs(drivers, destinations)).toEqual([
        [-3, -4.5, -3, -3],
        [-4.5, -6.75, -2, -2],
        [-2.25, -2.25, -3, -3],
        [-1.5, -2.25, -4, -4]
      ]);
    });

    it('properly maps driver and destination scores when there are more drivers', () => {
      const drivers = ['apple', 'sauce', 'pork', 'chops'];
      const destinations = [
        '123 Fake St',
        '456 Paddington Way',
        '789 Turtle Dove Lane'
      ];

      expect(mapJobs(drivers, destinations)).toEqual([
        [-3, -4.5, -3],
        [-4.5, -6.75, -2],
        [-2.25, -2.25, -3],
        [-1.5, -2.25, -4]
      ]);
    });

    it('properly maps driver and destination scores when there are more destinations', () => {
      const drivers = ['apple', 'sauce', 'pork'];
      const destinations = [
        '123 Fake St',
        '456 Paddington Way',
        '789 Turtle Dove Lane',
        '1011 Billboard Ave'
      ];

      expect(mapJobs(drivers, destinations)).toEqual([
        [-3, -4.5, -3, -3],
        [-4.5, -6.75, -2, -2],
        [-2.25, -2.25, -3, -3]
      ]);
    });
  });
});
