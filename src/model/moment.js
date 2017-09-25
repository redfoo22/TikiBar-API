'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let momentSchema = new Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  mediaUrls: { type: [String], default: [""]},
  totalLikes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now()},
  comments: [{ type: ObjectId, ref: 'Comment' }],
  location: { type: ObjectId, ref: 'Location'}
});

module.exports = mongoose.model('Moment', momentSchema, 'moment');
