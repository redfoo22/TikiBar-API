'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _userData = require('../model/userData');

var _userData2 = _interopRequireDefault(_userData);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _userDataExt = require('./extensions/userData-ext');

var _userDataExt2 = _interopRequireDefault(_userDataExt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = Promise;

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // GET all userData
  // '/v1/userData'
  api.get('/', function (req, res) {
    _userData2.default.find().exec(function (err, userData) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(userData);
    });
  });

  // GET Specific users userData byId
  // '/v1/userData/byId/:id'
  api.get('/byId/:id', function (req, res) {
    _userData2.default.findById(req.params.id).populate({
      path: 'journeys',
      model: 'Journey'
    }).exec(function (err, userData) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(userData);
    });
  });

  // GET Specific users by displayName
  // '/v1/userData/byDisplayName/:displayName'
  api.get('/byDisplayName/:displayName', function (req, res) {
    _userData2.default.findOne({ 'displayName': req.params.displayName }).populate({
      path: 'journeys',
      model: 'Journey'
    }).exec(function (err, userData) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(userData);
    });
  });

  api.post('/updateUserLocation', function (req, res) {
    var userId = req.body.userId;
    var location = req.body.location;

    if (userId == null || location == null) {
      res.status(409).json({ message: 'You must enter a user id and location object' });
    }
    _userData2.default.update({ _id: userId }, { $addToSet: { location: location } }, function (err, user) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json({ message: 'Location successfully updated' });
    });
  });

  // POST add new user
  // {
  //    displayName: 'RedFoo',
  //    profileImageUrl: 'www.myProfileImage.com',
  // }
  // '/v1/userData/addUser'
  api.post('/addUser', function (req, res) {
    var displayName = req.body.displayName;

    if (displayName == null) {
      res.status(409).json({ message: 'You must enter a Display name' });
      return;
    }

    var newUserData = new _userData2.default({
      displayName: displayName
    });

    newUserData.save(function (err) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
      } else {
        res.send(newUserData);
      }
    });
  });

  return api;
};
//# sourceMappingURL=userData.js.map