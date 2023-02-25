
'use strict';

const fs = require('fs');
const path = require('path');
const { throwFileNotFoundError } = require('./errors/error-utils');

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
