'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userData = require('../../model/userData');

var _userData2 = _interopRequireDefault(_userData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserDataExt = function UserDataExt() {
  _classCallCheck(this, UserDataExt);
};

UserDataExt.findUserById = function (userId) {
  return new Promise(function (resolve, reject) {
    _userData2.default.findById(userId).exec(function (err, user) {
      if (err) {
        reject("Error finding User.");
      }
      if (!user) {
        reject("Unable to find User.");
      }
      resolve(user);
    });
  });
};

UserDataExt.findUserByDisplayName = function (displayName) {
  return new Promise(function (resolve, reject) {
    _userData2.default.findOne({ 'displayName': displayName }).exec(function (err, user) {
      if (err) {
        reject("Error finding User.");
      }
      if (!user) {
        reject("Unable to find User.");
      }
      resolve(user);
    });
  });
};

exports.default = UserDataExt;
//# sourceMappingURL=userData-ext.js.map