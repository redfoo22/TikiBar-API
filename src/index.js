'use strict';

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import test from './test';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

switch (process.env.NODE_ENV) {
  case 'production':
    // api routes v1 (https://api.devslopes.com/tikibar)
    app.use('/tikibar', routes);
    break;
  case 'staging':
    // api routes /staging/v1
    app.use('/staging', routes);
    break;
  case 'development':
    // api routes /dev/v1
    app.use('/dev', routes);
    break;
  default:
    // api routes /localdev/v1
    app.use('/localdev', routes);
    break;
}


app.server.listen(config.port || 3210);
console.log(`NODE_ENV=${process.env.NODE_ENV}`);
console.log(`Started on port ${config.port || 3210}`);

export default app;
