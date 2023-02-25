'use strict';

const { throwTypeError } = require('./errors/error-utils');

/**
 * Returns the common factors of two numbers
 * @param {number} first
 * @param {number} second
 */
function commonFactors (first, second) {
  const firstFactors = factorize(first);
  const secondFactors = factorize(second);

  return firstFactors.filter(value => secondFactors.includes(value));
}

/**
 * Count number of consonants in a given string
 * TODO: Add 'sometimes y' counting
 * @param {string} string
 * @returns {number} number of vowels in a given string
 */
function countConsonants (string) {
  if (typeof string !== 'string') {
    throwTypeError(string, 'string');
  }
  const consonants = string.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/g);
  return consonants ? consonants.length : 0;
}

/**
 * Count number of vowels in a given string
 * TODO: Add 'sometimes y' counting
 * @param {string} string
 * @returns {number} number of vowels in a given string
 */
function countVowels (string) {
  if (typeof string !== 'string') {
    throwTypeError(string, 'string');
  }
  const vowels = string.toLowerCase().match(/[aeiou]/g);
  return vowels ? vowels.length : 0;
}

/**
 * Determine all factors for input number
 * @param {number} number
 * @returns {Array<number>} array of all factors
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
 * @param {string} string
 * @returns {boolean} true/false, throws error for non-string inputs
 */
function lengthIsEven (string) {
  if (typeof string !== 'string') {
    throwTypeError(string, 'string');
  }
  return string.length % 2 === 0;
}

module.exports = {
  commonFactors,
  countConsonants,
  countVowels,
  factorize,
  lengthIsEven
};
