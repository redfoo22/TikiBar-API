'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let journeySchema = new Schema({
  userId : { type: ObjectId, ref: 'UserData', required: [true, 'Error validating userId'] },
  title: { type: String, default: "" },
  moments: [{ type: ObjectId, ref: 'Moment' }],
});

module.exports = mongoose.model('Journey', journeySchema, 'journey');
