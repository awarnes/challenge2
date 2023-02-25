/* eslint max-len: 0 */
'use strict';

const path = require('path');
const exec = require('child_process').exec;

function testCli (args, cwd) {
  return new Promise(resolve => {
    exec(`node ${path.resolve('./index')} ${args.join(' ')}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      }
    );
  });
}

describe('Shipment Routing CLI', () => {
  describe('route/', () => {
    it('should run without error', async () => {
      const result = await testCli(['route', '-t', '10,10'], '.');

      expect(result.code).toBe(0);
      expect(result.error).toBe(null);
      expect(result.stderr).toBe('');
    });

    it('should return the proper values', async () => {
      const result = await testCli([
        'route',
        '-d',
        'test/data/drivers5.data',
        '-s',
        'test/data/destinations5.data'
      ], '.');

      expect(result.code).toBe(0);
      expect(result.stdout).toEqual(`${JSON.stringify({
        suitabilityScore: 38.5,
        matches: [
          ['Minnie Auer', '23214 Batz Forest, Compton, FL 09954'],
          [
            'Sue Johns',
            '36768 Candida Ford Apt. 435, Pittsfield, WA 71375-3462'
          ],
          ['Darrel Moen', '7215 Flatley Glen, St. Joseph, MS 46635'],
          [
            'Carrie Collier',
            '45262 Lang Forest Apt. 274, Broken Arrow, MN 92295'
          ],
          [
            'Pat White',
            '6659 Rylee Estates Apt. 768, Mount Pleasant, WI 38130'
          ]
        ]
      })}\n`);
    });

    it('should print the help for the command', async () => {
      const result = await testCli(['route', '-h'], '.');

      expect(result.stdout).toEqual(`Usage: shipment-routing route [options]

Route shipments to drivers given a list of shipments and list of drivers

Options:
  -d --driverFile <driverFile>                    file of driver names \\n separated
  -s --destinationFile <destinationFile>          list of shipment destinations \\n separated
  -t --testData <driverCount>,<destinationCount>  Comma separated count of number of drivers and destinations to generate.
  -r --relative                                   Whether to treat paths as relative
  -h, --help                                      display help for command
`);
    });
  });

  describe('generate/', () => {
    it('should run without error', async () => {
      const result = await testCli(['generate', '-d', '7', '-s', '7'], '.');

      expect(result.code).toBe(0);
      expect(result.error).toBe(null);
      expect(result.stderr).toBe('');
    });

    it('should return expected values', async () => {
      const driverCount = 7;
      const destinationCount = 7;

      const result = await testCli(['generate', '-d', driverCount, '-s', destinationCount], '.');

      expect(result.stdout.split('\n').length).toBe(driverCount + destinationCount + 5);
    });

    it('should print the help for the command', async () => {
      const result = await testCli(['generate', '-h'], '.');

      expect(result.stdout).toEqual(`Usage: shipment-routing generate [options]

Generate data for use with the command line tool

Options:
  -d --driverCount <driverCount>            Number of driver names to generate
  -s --destinationCount <destinationCount>  Number of destinations to generate
  -p --path <path>                          Path to save files. If not included will output on command line.
  -h, --help                                display help for command
`);
    });
  });

  describe('help/', () => {
    it('should run without error', async () => {
      const result = await testCli(['help'], '.');

      expect(result.code).toBe(0);
      expect(result.error).toBe(null);
      expect(result.stderr).toBe('');
      expect(result.stdout).toEqual(`Usage: shipment-routing [options] [command]

Routing shipments to drivers as efficiently as possible.

Options:
  -V, --version       output the version number
  -h, --help          display help for command

Commands:
  route [options]     Route shipments to drivers given a list of shipments and
                      list of drivers
  generate [options]  Generate data for use with the command line tool
  help [command]      display help for command
`);
    });
  });
});
