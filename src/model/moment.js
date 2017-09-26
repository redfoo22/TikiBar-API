'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let momentSchema = new Schema({
  journeyId : { type: ObjectId, ref: 'Journey', required: [true, 'Error validating journeyId'] },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  mediaUrls: { type: [String], default: [""]},
  totalLikes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now()},
  comments: [{ type: ObjectId, ref: 'Comment' }],
  location: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Moment', momentSchema, 'moment');
