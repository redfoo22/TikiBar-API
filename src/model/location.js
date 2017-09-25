'use strict';

import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let locationSchema = new Schema({
  latitude: { type: Number, default: 45.585 },
  longitude: { type: Number, default: -122.703 }
});

module.exports = mongoose.model('Location', userDataSchema, 'location');
