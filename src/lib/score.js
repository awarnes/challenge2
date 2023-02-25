'use strict';

const parse = require('./parse');
const { commonFactors, countVowels, countConsonants } = require('./rules');

/**
- If the length of the shipment's destination street name is even, the base suitability
score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
- If the length of the shipment's destination street name is odd, the base SS is the
number of consonants in the driver’s name multiplied by 1.
- If the length of the shipment's destination street name shares any common factors
(besides 1) with the length of the driver’s name, the SS is increased by 50% above the
base SS.
 */

/**
 * Calculates the suitability score for a given driver and destination
 * @param {*} driver Driver name
 * @param {*} destination Destination address
 * @returns {number} The sutiability score of the driver to destination
 */
function score (driver, destination) {
  const streetName = parse.streetName(destination);
  let baseSuitabilityScore = 0.0;
  if (streetName.length % 2 === 0) {
    baseSuitabilityScore += countVowels(driver) * 1.5;
  } else {
    baseSuitabilityScore += countConsonants(driver);
  }

  const factors = commonFactors(driver.length, streetName.length);

  return factors.length > 1 ? baseSuitabilityScore * 1.5 : baseSuitabilityScore;
}

function mapJobs (drivers, destinations) {
  const possibleJobs = [];
  drivers.forEach((driver, index) => {
    possibleJobs.push([]);
    destinations.forEach(destination => {
      possibleJobs[index].push(score(driver, destination) * -1);
    });
  });
  return possibleJobs;
}

module.exports = {
  score,
  mapJobs
};
