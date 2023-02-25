'use strict';

const { faker } = require('@faker-js/faker');

/**
 * Generates destination data for testing
 * @param {number} count Number of destinations to generate (default 10)
 * @returns {string[]} Array of destination addresses
 */
function destinationData (count = 10) {
  return Array(count).fill().map((_, index) => {
    const streetAddress = faker.address.streetAddress(index % 2 === 0);
    const city = faker.address.cityName();
    const state = faker.address.stateAbbr();
    const zipCode = faker.address.zipCodeByState(state);
    return `${streetAddress}, ${city}, ${state} ${zipCode}`;
  });
}

/**
 * Generates driver data for testing (even distribution of male and female names)
 * @param {number} count Number of drivers to generate (default 10)
 * @returns {string[]} Array of driver names
 */
function driverData (count = 10) {
  return Array(count).fill().map((_, index) => {
    return faker.name.fullName(index % 2 === 0 ? 'male' : 'female');
  });
}

module.exports = {
  destinationData,
  driverData
};
