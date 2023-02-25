'use strict';

const { Command } = require('commander');
const routeShipments = require('./src/route-shipments');
const { driverData, destinationData } = require('./test/generate');
const { readData } = require('./src/lib/parse');

const program = new Command();

program
  .name('shipment-routing')
  .description('Routing shipments to drivers as efficiently as possible.')
  .version('1.0.0');

program.command('route')
  .description('Route shipments to drivers given a list of shipments and list of drivers')
  .option('-d --driverFile <driverFile>', 'file of driver names \\n separated')
  .option('-s --destinationFile <destinationFile>', 'list of shipment destinations \\n separated')
  .option(
    '-t --testData <driverCount>,<destinationCount>',
    'Comma separated count of number of drivers and destinations to generate.'
  )
  .action((args) => {
    const { testData, destinationFile, driverFile } = args;
    let destinations, drivers;

    if (testData) {
      const [driverCount, destinationCount] = testData.split(',');
      drivers = driverData(parseInt(driverCount));
      destinations = destinationData(parseInt(destinationCount));
    } else {
      drivers = readData(driverFile);
      destinations = readData(destinationFile);
    }
    console.log(drivers);
    console.log(destinations);
    const results = routeShipments(drivers, destinations);
    console.log(results);
  });

program.parse();
