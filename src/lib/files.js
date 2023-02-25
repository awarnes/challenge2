
'use strict';

const fs = require('fs');
const { throwFileNotFoundError } = require('./errors/error-utils');

/**
 * Reads the data out of a file and returns each line as a string.
 * @param {string} filePath Path to file to read from
 * @param {string} delimiter default \n
 * @returns {string[]} The data read from the file as an array of strings.
 */
function readData (filePath, delimiter = '\n') {
  if (!fs.existsSync(filePath)) {
    throwFileNotFoundError(filePath);
  }

  const data = fs.readFileSync(filePath, 'utf-8');

  return data.split(delimiter);
}

/**
 * Writes data to a file
 * @param {string} filePath Path to file to write to
 * @param {string | Array<string>} data Data to write to the file,
 * will join array with delimiter if necessary
 * @param {string} delimiter default '\n'
 */
function writeData (filePath, data, delimiter = '\n') {
  if (typeof data !== 'string') {
    data = data.join(delimiter);
  }

  fs.writeFileSync(filePath, data);
}

module.exports = {
  readData,
  writeData
};
