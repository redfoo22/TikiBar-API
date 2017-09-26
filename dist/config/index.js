'use strict';

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var extend = require('util')._extend;

var localdev = require('./env/localdev');
var development = require('./env/development');
var staging = require('./env/staging');
var production = require('./env/production');

var defaults = {
  root: path.normalize(__dirname + '/..')
};

module.exports = {
  localdev: extend(localdev, defaults),
  development: extend(development, defaults),
  staging: extend(staging, defaults),
  production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];
//# sourceMappingURL=index.js.map