'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var journeySchema = new Schema({
  userId: { type: ObjectId, ref: 'UserData', required: [true, 'Error validating userId'] },
  title: { type: String, default: "" },
  moments: [{ type: ObjectId, ref: 'Moment' }]
});

module.exports = _mongoose2.default.model('Journey', journeySchema, 'journey');
//# sourceMappingURL=journey.js.map