'use strict';

const path = require('path');
const extend = require('util')._extend;

const localdev = require('./env/localdev');
const development = require('./env/development');
const staging = require('./env/staging');
const production = require('./env/production');

import config from './config.json';

let defaults = {
  root: path.normalize(`${ __dirname }/..`)
};

module.exports = {
  localdev: extend(localdev, defaults),
  development: extend(development, defaults),
  staging: extend(staging, defaults),
  production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];
