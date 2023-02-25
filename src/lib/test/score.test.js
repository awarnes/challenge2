'use strict';

const { mapJobs, _mapJobs, score } = require('../score');

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

  describe('_mapJobs/', () => {
    it('properly maps driver and destination scores', async () => {
      const drivers = ['apple', 'sauce', 'pork', 'chops'];
      const destinations = [
        '123 Fake St',
        '456 Paddington Way',
        '789 Turtle Dove Lane',
        '1011 Billboard Ave'
      ];

      expect(await _mapJobs(drivers, destinations)).toEqual([
        [-3, -4.5, -3, -3],
        [-4.5, -6.75, -2, -2],
        [-2.25, -2.25, -3, -3],
        [-1.5, -2.25, -4, -4]
      ]);
    });

    it('properly maps driver and destination scores when there are more drivers', async () => {
      const drivers = ['apple', 'sauce', 'pork', 'chops'];
      const destinations = [
        '123 Fake St',
        '456 Paddington Way',
        '789 Turtle Dove Lane'
      ];

      expect(await _mapJobs(drivers, destinations)).toEqual([
        [-3, -4.5, -3],
        [-4.5, -6.75, -2],
        [-2.25, -2.25, -3],
        [-1.5, -2.25, -4]
      ]);
    });

    it('properly maps driver and destination scores when there are more destinations', async () => {
      const drivers = ['apple', 'sauce', 'pork'];
      const destinations = [
        '123 Fake St',
        '456 Paddington Way',
        '789 Turtle Dove Lane',
        '1011 Billboard Ave'
      ];

      expect(await _mapJobs(drivers, destinations)).toEqual([
        [-3, -4.5, -3, -3],
        [-4.5, -6.75, -2, -2],
        [-2.25, -2.25, -3, -3]
      ]);
    });
  });

  describe('mapJobs/', () => {
    it('properly maps driver and destination scores when using small input', async () => {
      const drivers = ['apple', 'sauce', 'pork', 'chops'];
      const destinations = [
        '123 Fake St',
        '456 Paddington Way',
        '789 Turtle Dove Lane',
        '1011 Billboard Ave'
      ];

      expect(await mapJobs(drivers, destinations)).toEqual([
        [-3, -4.5, -3, -3],
        [-4.5, -6.75, -2, -2],
        [-2.25, -2.25, -3, -3],
        [-1.5, -2.25, -4, -4]
      ]);
    });

    it('properly maps driver and destination scores when using large inputs', async () => {
      const drivers = Array(500).fill('some string');
      const destinations = Array(500).fill('other string');

      expect(await mapJobs(drivers, destinations)).toEqual(Array(500).fill(Array(500).fill(-7)));
    });
  });
});
