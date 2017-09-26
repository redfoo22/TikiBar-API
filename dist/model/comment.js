'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userData = require('./userData');

var _userData2 = _interopRequireDefault(_userData);

var _moment = require('./moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var commentResponseSchema = new Schema({
  text: { type: String, required: [true] },
  updated: { type: Date, default: Date.now },
  userId: { type: ObjectId, ref: 'UserData', required: [true, 'Error validating userId'] },
  userProfileImgUrl: { type: String },
  displayName: { type: String },
  flaggedCount: { type: Number, default: 0 }
});

var commentSchema = new Schema({
  momentId: { type: ObjectId, ref: 'Moment', required: [true, 'Error validating momentId'] },
  userId: { type: ObjectId, ref: 'UserData', required: [true, 'Error validating userId'] },
  userProfileImgUrl: { type: String },
  displayName: { type: String },
  updated: { type: Date, default: Date.now },
  text: { type: String, required: [true] },
  responses: [commentResponseSchema],
  flaggedCount: { type: Number, default: 0 },
  archived: { type: Boolean, default: false }
});

exports.default = _mongoose2.default.model('Comment', commentSchema, 'comments');
//# sourceMappingURL=comment.js.map