'use strict';

import mongoose from 'mongoose';
import UserData from './userData';
import Moment from './moment';

let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let commentResponseSchema = new Schema({
  text: {type: String, required: [true]},
  updated: { type: Date, default: Date.now },
  userId : { type: ObjectId, ref: 'UserData', required: [true, 'Error validating userId'] },
  userProfileImgUrl: { type: String },
  displayName: { type: String },
  flaggedCount: {type: Number, default: 0}
});

let commentSchema = new Schema({
  momentId: { type: ObjectId, ref: 'Moment', required: [true, 'Error validating momentId']},
  userId : { type: ObjectId, ref: 'UserData', required: [true, 'Error validating userId'] },
  userProfileImgUrl: { type: String },
  displayName: { type: String },
  updated: { type: Date, default: Date.now },
  text: {type: String, required: [true]},
  responses: [commentResponseSchema],
  flaggedCount: {type: Number, default: 0},
  archived: {type: Boolean, default: false}
});

export default mongoose.model('Comment', commentSchema, 'comments');
