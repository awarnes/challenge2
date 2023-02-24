'use strict';

const { throwTypeError } = require('./errors/error-utils');

/**
 * Count number of vowels in a given string
 * TODO: Add 'sometimes y' counting
 * @param {String} string
 * @returns {Number} number of vowels in a given string
 */
function countVowels (string) {
  if (typeof string !== 'string') {
    throwTypeError(string, 'string');
  }
  const vowels = string.match(/[aeiouAEIOU]/g);
  return vowels ? vowels.length : 0;
}

/**
 * Determine all factors for input number
 * @param {Number} number
 * @returns {Array<Number>} array of all factors
 */
function factorize (number) {
  if (typeof number !== 'number') {
    throwTypeError(number, 'number');
  }

  const factors = Array
    .from(Array(Math.floor(number / 2) + 1), (_, index) => index)
    .filter(index => number % index === 0);

  return [...factors, number];
}

/**
 * Whether a string has an even or an odd length
 * @param {String} string
 * @returns {Boolean} true/false, throws error for non-string inputs
 */
function lengthIsEven (string) {
  if (typeof string !== 'string') {
    throwTypeError(string, 'string');
  }
  return string.length % 2 === 0;
}

module.exports = {
  countVowels,
  factorize,
  lengthIsEven
};
