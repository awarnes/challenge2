'use strict';

class ShipRouteError extends Error {
  constructor (message, options) {
    super(message);
    this.name = 'ShipRouteError';
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });
  }
}

module.exports = ShipRouteError;
