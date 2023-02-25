'use strict';

const { Command } = require('commander');
const routeShipments = require('./src/route-shipments');
const {driverData, destinationData} = require('./test/generate');

const program = new Command();

program
  .name('shipment-routing')
  .description('Routing shipments to drivers as efficiently as possible.')
  .version('1.0.0');

program.command('route')
  .description('Route shipments to drivers given a list of shipments and list of drivers')
  .option('-d --driverFile <driverFile>', 'file of driver names \\n separated')
  .option('-c --driverCount <drivers>', 'file of driver names \\n separated')
  .option('-s --destinationFile <destinationFile>', 'list of shipment destinations \\n separated')
  .option('-r --destinationCount <destinations>', 'list of shipment destinations \\n separated')
  .action((args) => {
    const {destinationCount, driverCount, destinationFile, driverFile} = args;
    let destinations, drivers;

    if (destinationCount && driverCount) {
      drivers = driverData(parseInt(driverCount));
      destinations = destinationData(parseInt(destinationCount));
    } else {
      // Get data from file instead
    }

    const results = routeShipments(drivers, destinations);
    console.log(results)
  });

program.parse();