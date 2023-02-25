#!/usr/bin/env node

'use strict';

const path = require('path');
const { Command } = require('commander');
const routeShipments = require('./src/route-shipments');
const { driverData, destinationData } = require('./test/generate');
const { readData, writeData } = require('./src/lib/files');
const { prettify, stringify } = require('./src/lib/prettify');

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
  .option('-f --file', 'Dump output to file')
  .action(async (args) => {
    const { testData, destinationFile, driverFile, file } = args;
    let destinations, drivers;

    if (testData) {
      const [driverCount, destinationCount] = testData.split(',');
      drivers = driverData(parseInt(driverCount));
      destinations = destinationData(parseInt(destinationCount));
    } else {
      drivers = readData(driverFile);
      destinations = readData(destinationFile);
    }

    const results = await routeShipments(drivers, destinations);

    prettify(results);

    if (file) {
      writeData('driver-destinations.txt', stringify(results));
    }
  });

program.command('generate')
  .description('Generate data for use with the command line tool')
  .option('-d --driverCount <driverCount>', 'Number of driver names to generate')
  .option('-s --destinationCount <destinationCount>', 'Number of destinations to generate')
  .option('-p --path <path>', 'Path to save files. If not included will output on command line.')
  .action((args) => {
    const { driverCount, destinationCount, path: filePath } = args;

    const drivers = driverData(parseInt(driverCount));
    const destinations = destinationData(parseInt(destinationCount));

    if (filePath) {
      writeData(path.join(filePath, 'drivers.data'), drivers);
      writeData(path.join(filePath, 'destinations.data'), destinations);
      return;
    }

    console.log('Drivers: ', drivers);
    console.log('Destinations: ', destinations);
  });

program.parse();
