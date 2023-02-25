'use strict';

const parser = require('@conpago/address');
const {
  throwStreetNameNotFoundError,
  throwTypeError
} = require('./errors/error-utils');

/**
 * Parse the street name out of a given address
 * @param {string} address Address formatted string
 * @returns {string} the street name from the given address
 */
function streetName (address) {
  if (typeof address !== 'string') {
    throwTypeError(address, 'string');
  }

  try {
    const { street } = parser.parseInformalAddress(address);
    return street;
  } catch (error) {
    throwStreetNameNotFoundError();
  }
}

module.exports = {
  streetName
};
