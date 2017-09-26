'use strict';

import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let locationSchema = new Schema({
  latitude: { type: Number },
  longitude: { type: Number}
});

module.exports = mongoose.model('Location', locationSchema, 'location');
