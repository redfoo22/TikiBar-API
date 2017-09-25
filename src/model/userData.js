'use strict';

import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let userDataSchema = new Schema({
  displayName: { type: String, default: "" },
  profileImageUrl: { type: String, default: "" },
  journeys: [{ type: ObjectId, ref: 'Journey' }],
  currentLocation: { type: ObjectId, ref: 'Location'}
});

module.exports = mongoose.model('UserData', userDataSchema, 'userData');
