'use strict';

const { throwTypeError } = require('./errors/error-utils');

/**
 * Returns the common factors of two numbers
 * @param {number} first
 * @param {number} second
 * @returns {number[]} Array of common factors for both numbers
 */
function commonFactors (first, second) {
  const firstFactors = factorize(first);
  const secondFactors = factorize(second);

  return firstFactors.filter(value => secondFactors.includes(value));
}

/**
 * Count number of consonants in a given string
 * TODO: Add 'sometimes y' counting https://github.com/awarnes/shipment-routing/issues/14
 * @param {string} string
 * @returns {number} number of consonants in a given string
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
 * TODO: Add 'sometimes y' counting https://github.com/awarnes/shipment-routing/issues/14
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
 * @param {number} number number to factorize
 * @returns {number[]} array of all factors
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
 * Validates input is a string and checks wether it has an even length
 * @param {string} string string to check
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
