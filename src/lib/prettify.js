'use strict';

/**
 * Prettifies the result output
 * @param {{suitabilityScore: number, matches: string[][]}} results
 */
function prettify (results) {
  console.log(`Total Suitability Score: ${results.suitabilityScore}`);
  const matches = results.matches.map(match => ({ driver: match[0], destination: match[1] }));
  console.table(matches);
}

/**
 * Stringifies the result output for dumping to a file
 * @param {{suitabilityScore: number, matches: string[][]}} results
 * @returns {string} Prettified string value of results object
 */
function stringify (results) {
  const matches = results.matches.map(match => `${match[0]}: ${match[1]}\n`);
  return `Total Suitability Score: ${results.suitabilityScore}\n${matches}`;
}

module.exports = {
  prettify,
  stringify
};
