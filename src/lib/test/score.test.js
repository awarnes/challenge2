'use strict';

const {score} = require('../score');
// const ShipRouteError = require('../errors/ship-route-error');
// const {TYPE_ERROR} = require('../errors/error-codes');

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