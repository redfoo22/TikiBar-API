'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var momentSchema = new Schema({
  journeyId: { type: ObjectId, ref: 'Journey', required: [true, 'Error validating journeyId'] },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  mediaUrls: { type: [String], default: [""] },
  totalLikes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now() },
  comments: [{ type: ObjectId, ref: 'Comment' }],
  location: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  }
});

module.exports = _mongoose2.default.model('Moment', momentSchema, 'moment');
//# sourceMappingURL=moment.js.map