'use strict';

const fs = require('fs');
const path = require('path');
const parser = require('@conpago/address');
const {
  throwFileNotFoundError,
  throwStreetNameNotFoundError,
  throwTypeError
} = require('./errors/error-utils');

// Current directory for where the function was called
const CURRENT_DIRECTORY = process.cwd();

/**
 * Reads the data out of a file and returns each line as a string.
 * @param {string} fileName
 * @param {boolean} relative
 * @returns {string[]} The data read from the file as an array of strings.
 */
function readData (fileName, relative = true) {
  let filePath = fileName;

  if (relative) {
    filePath = path.join(CURRENT_DIRECTORY, fileName);
  }

  if (!fs.existsSync(filePath)) {
    throwFileNotFoundError(filePath);
  }

  const data = fs.readFileSync(filePath, 'utf-8');

  return data.split('\n');
}

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
  readData,
  streetName
};
