'use strict';

const hungarian = require('hungarian-on3');
const { mapJobs } = require('./lib/score');

/**
 * Using the Hungarian Algorithm (https://en.wikipedia.org/wiki/Hungarian_algorithm)
 * to find the most optimal destinations for each driver
 * @param {string[]} drivers Array of driver names
 * @param {string[]} destinations Array of destination addresses
 * @returns {{suitabilityScore: number, matches: string[][]}}
 * returns the suitabilityScore and list of matches
 */
module.exports = async (drivers, destinations) => {
  const possibleJobs = await mapJobs(drivers, destinations);

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
