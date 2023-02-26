'use strict';

const hungarian = require('hungarian-on3');
const { mapJobs } = require('../src/lib/score');
const { driverData, destinationData } = require('../generate-data');

const MILLISECONDS = 1000;
const FLOAT_PRECISION = 3;

/**
 * Times a function and returns any return value
 * @param {func} func
 * @param  {...any} args
 * @returns {[any, number]}
 */
async function time (func, ...args) {
  const timeStart = performance.now();
  const value = await func(...args);
  const timeEnd = performance.now();

  return [value, timeEnd - timeStart];
}

/**
 * Runs through one iteration of the route program
 * 1. Generates random data
 * 2. Maps all possible job scores
 * 3. Solves the Assignment Problem
 * @param {number} driverCount count of drivers to use in test run
 * @param {number} destinationCount count of destinations to use in test run
 * @returns {
 *  {driverTime: number, destinationTime: number, mapJobsTime: number, hungarianTime: number}
 * } result for the given test run
 */
async function testRun (driverCount, destinationCount) {
  const [drivers, driverTime] = await time(driverData, driverCount);
  const [destinations, destinationTime] = await time(destinationData, destinationCount);
  const [possibleJobs, mapJobsTime] = await time(mapJobs, drivers, destinations);
  // eslint-disable-next-line no-unused-vars
  const [_, hungarianTime] = await time(hungarian, possibleJobs);

  return ({
    driverTime,
    destinationTime,
    mapJobsTime,
    hungarianTime
  });
}

/**
 * Runs a basic performance test against given input
 * Prints the results averaged across all testRuns (default 10)
 * @param {number[][]} testValues Array of [driverCount, destinationCount] pairs
 * @param {number} testRuns number of runs to do per testValue
 */
function performanceTest (testValues, testRuns = 10) {
  testValues.forEach(async pairCount => {
    const [driverCount, destinationCount] = pairCount;

    const results = await Array(testRuns).fill().reduce(async (total) => {
      const currentTotal = await total;
      const result = await testRun(driverCount, destinationCount);
      return {
        driverTime: (currentTotal.driverTime + parseFloat(result.driverTime)) / 2,
        destinationTime: (currentTotal.destinationTime + parseFloat(result.destinationTime)) / 2,
        mapJobsTime: (currentTotal.mapJobsTime + parseFloat(result.mapJobsTime)) / 2,
        hungarianTime: (currentTotal.hungarianTime + parseFloat(result.hungarianTime)) / 2
      };
    }, { driverTime: 0, destinationTime: 0, mapJobsTime: 0, hungarianTime: 0 });

    console.log(`Testing with [${driverCount}] drivers and [${destinationCount}] destinations`);

    const formattedResults = Object.entries(results).reduce((result, value) => {
      return { ...result, [value[0]]: (value[1] / MILLISECONDS).toFixed(FLOAT_PRECISION) };
    }, {});

    console.table(formattedResults);
  });
}

performanceTest([[10, 10], [100, 100], [500, 500], [1000, 1000]]);
