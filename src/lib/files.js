
'use strict';

const fs = require('fs');
const { throwFileNotFoundError } = require('./errors/error-utils');

/**
 * Reads the data out of a file and returns each line as a string.
 * @param {string} fileName
 * @returns {string[]} The data read from the file as an array of strings.
 */
function readData (fileName) {
  const filePath = fileName;

  if (!fs.existsSync(filePath)) {
    throwFileNotFoundError(filePath);
  }

  const data = fs.readFileSync(filePath, 'utf-8');

  return data.split('\n');
}

function writeData (filePath, data) {
  if (typeof data !== 'string') {
    data = data.join('\n');
  }

  fs.writeFileSync(filePath, data);
}

module.exports = {
  readData,
  writeData
};
