'use strict';

const hungarian = require('hungarian-on3');
const { mapJobs } = require('./lib/score');

/**
 * Using the Hungarian Algorithm (https://en.wikipedia.org/wiki/Hungarian_algorithm)
 * to find the most optimal destinations for each driver
 * @param {Array<string>} drivers Array of driver names
 * @param {Array<string>} destinations Array of destination addresses
 * @returns {Object} returns the suitabilityScore and list of matches
 */
module.exports = (drivers, destinations) => {
  const possibleJobs = mapJobs(drivers, destinations);

  const results = hungarian(possibleJobs);

  return results.reduce((suitabilityMatches, match) => {
    const [driverIndex, destinationIndex] = match;

    if (destinationIndex === -1) {
      // Driver does not have a matching destination
      return suitabilityMatches;
    }

    suitabilityMatches.suitabilityScore += possibleJobs[driverIndex][destinationIndex] * -1;
    suitabilityMatches.matches.push([
      drivers[driverIndex],
      destinations[destinationIndex]
    ]);
    return suitabilityMatches;
  }, { suitabilityScore: 0, matches: [] });
};
