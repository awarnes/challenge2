'use strict';

const { Command } = require('commander');
const routeShipments = require('./src/route-shipments');

const program = new Command();

program
  .name('shipment-routing')
  .description('Routing shipments to drivers as efficiently as possible.')
  .version('1.0.0');

program.command('route')
  .description('Route shipments to drivers given a list of shipments and list of drivers')
  .option('-d --drivers <drivers>', 'list of drivers')
  .option('-s --shipments <shipments>', 'list of shipments')
  .action(routeShipments);

program.parse();