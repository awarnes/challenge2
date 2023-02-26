'use strict';

const { parentPort } = require('worker_threads');
const { _mapJobs } = require('./score');

parentPort.on('message', message => {
  const { drivers, destinations } = message;

  const possibleJobs = _mapJobs(drivers, destinations);
  message.port.postMessage(possibleJobs);
  message.port.close();
});
