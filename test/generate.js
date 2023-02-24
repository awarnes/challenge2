'use strict';

const {faker} = require('@faker-js/faker');

/**
 * Generate destination data for testing
 */
function destinations(count = 10) {
  return Array(count).fill().map((_, index) => {
    const streetAddress = faker.address.streetAddress(index % 2 === 0);
    const city = faker.address.cityName();
    const state = faker.address.stateAbbr();
    const zipCode = faker.address.zipCodeByState(state);
    return `${streetAddress}, ${city}, ${state} ${zipCode}`;
  })
}

/**
 * Generate driver data for testing
 */
function drivers(count = 10) {
  return Array(count).fill().map((_, index) => {
    return faker.name.fullName(index % 2 === 0 ? 'male' : 'female');
  })
}

module.exports = {
  destinations,
  drivers
}