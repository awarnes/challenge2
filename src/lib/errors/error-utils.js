'use strict';

const ShipRouteError = require('./ship-route-error');
const {
  FILE_NOT_FOUND_ERROR,
  STREET_NAME_NOT_FOUND_ERROR,
  TYPE_ERROR
} = require('./error-codes');

/**
 * Throws a file not found error
 * @param {string} fileName File name that couldn't be found to call out in the error message
 * @throws {ShipRouteError}
 */
function throwFileNotFoundError (fileName) {
  throw new ShipRouteError(`[${fileName}] file not found!`, {
    code: FILE_NOT_FOUND_ERROR
  });
}

/**
 * Throws a street name not found error
 * @throws {ShipRouteError}
 */
function throwStreetNameNotFoundError () {
  throw new ShipRouteError('Street name not found!', {
    code: STREET_NAME_NOT_FOUND_ERROR
  });
}

/**
 * Throws a type error
 * @param {*} value value that failed the type check
 * @param {string} type type that the value should have been
 * @throws {ShipRouteError}
 */
function throwTypeError (value, type) {
  throw new ShipRouteError(`Error: [${JSON.stringify(value)}] not of type ${type}`, {
    code: TYPE_ERROR
  });
}

module.exports = {
  throwFileNotFoundError,
  throwStreetNameNotFoundError,
  throwTypeError
};
