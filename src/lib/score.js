'use strict';

const parse = require('./parse');
const { commonFactors, countVowels, countConsonants } = require('./rules');

/**
 * Calculates the suitability score for a given driver and destination
 * @param {string} driver Driver name
 * @param {string} destination Destination address
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

/**
 * Given a list of drivers and destinations, generates the total job map of
 * scores for each driver and job. The hungarian method for solving the
 * assignment problem attempts to find the cheapest cost across all options.
 * By making all the scores here negative we find the cheapest solution and
 * can change them to positive later for our output.
 * TODO: Make this more efficient https://github.com/awarnes/shipment-routing/issues/15
 * @param {string[]} drivers Array of driver names
 * @param {string[]} destinations Array of destination addresses
 * @returns {number[][]} Returns map of scores
 */
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
