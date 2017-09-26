'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var userDataSchema = new Schema({
  displayName: { type: String, default: "" },
  profileImageUrl: { type: String, default: "" },
  journeys: [{ type: ObjectId, ref: 'Journey' }],
  currentLocation: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  }
});

module.exports = _mongoose2.default.model('UserData', userDataSchema, 'userData');
//# sourceMappingURL=userData.js.map