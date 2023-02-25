'use strict';

const path = require('node:path');
const Pool = require('worker-thread-pool');
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
 * If the length of the drivers*destinations is too large, split task into
 * individual worker jobs to increase speed at the cost of CPU.
 * @param {string[]} drivers Array of driver names
 * @param {string[]} destinations Array of destination addresses
 * @returns {number[][]} Returns map of scores
 */
async function mapJobs (drivers, destinations) {
  const { length: driversLength } = drivers;
  const { length: destinationsLength } = destinations;

  if ((driversLength * destinationsLength) < 150000) {
    // Smaller jobs run faster without splitting the work
    // Should do more testing, 100k seems to be about the break-even point
    return _mapJobs(drivers, destinations);
  }

  const poolSize = Math.floor((driversLength + destinationsLength) / 2 / 100);

  const pool = new Pool({
    path: path.join(__dirname, '/map-worker.js'),
    size: Math.min(6, poolSize)
  });

  const JOB_LENGTH = 100;
  const splitJobs = [];
  for (let index = 0; index < driversLength; index += JOB_LENGTH) {
    splitJobs.push(drivers.slice(index, index + JOB_LENGTH));
  }

  const possibleJobs = await splitJobs.reduce(async (possibleJobs, job) => {
    const result = await pool.run({ drivers: job, destinations });
    const jobs = await possibleJobs;
    return [...jobs, ...result];
  }, []);

  pool.close();
  return possibleJobs;
}

/**
 * The heart of the map jobs function to be called by the mapJobs function or worker
 * @param {string[]} drivers array of driver names
 * @param {string[]} destinations array of destinaton names
 * @returns
 */
function _mapJobs (drivers, destinations) {
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
  mapJobs,
  _mapJobs
};
