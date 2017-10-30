'use strict';

import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let userDataSchema = new Schema({
  displayName: { type: String },
  profileImageUrl: { type: String },
  facebookId: { type: String },
  fullName: { type: String },
  journeys: [{ type: ObjectId, ref: 'Journey' }],
  currentLocation: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('UserData', userDataSchema, 'userData');
