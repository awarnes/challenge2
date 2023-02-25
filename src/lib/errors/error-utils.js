'use strict';

const ShipRouteError = require('./ship-route-error');
const {
  FILE_NOT_FOUND_ERROR,
  STREET_NAME_NOT_FOUND_ERROR,
  TYPE_ERROR
} = require('./error-codes');

function throwFileNotFoundError (fileName) {
  throw new ShipRouteError(`[${fileName}] file not found!`, {
    code: FILE_NOT_FOUND_ERROR
  });
}

function throwStreetNameNotFoundError () {
  throw new ShipRouteError('Street name not found!', {
    code: STREET_NAME_NOT_FOUND_ERROR
  });
}

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
