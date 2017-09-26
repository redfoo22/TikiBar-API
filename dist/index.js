'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// middleware
app.use((0, _cors2.default)({
  exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

switch (process.env.NODE_ENV) {
  case 'production':
    // api routes v1 (https://api.devslopes.com/tikibar)
    app.use('/tikibar', _routes2.default);
    break;
  case 'staging':
    // api routes /staging/v1
    app.use('/staging', _routes2.default);
    break;
  case 'development':
    // api routes /dev/v1
    app.use('/dev', _routes2.default);
    break;
  default:
    // api routes /localdev/v1
    app.use('/localdev', _routes2.default);
    break;
}

app.server.listen(_config2.default.port || 3210);
console.log('NODE_ENV=' + process.env.NODE_ENV);
console.log('Started on port ' + (_config2.default.port || 3210));

exports.default = app;
//# sourceMappingURL=index.js.map