'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _journey = require('../model/journey');

var _journey2 = _interopRequireDefault(_journey);

var _userData = require('../model/userData');

var _userData2 = _interopRequireDefault(_userData);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = Promise;

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // GET all journeys
  // '/v1/journeys'
  api.get('/', function (req, res) {
    _journey2.default.find().exec(function (err, journeys) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(journeys);
    });
  });

  // GET Specific journey byId
  // '/v1/journeys/byId/:id'
  api.get('/byId/:id', function (req, res) {
    _journey2.default.findById(req.params.id).populate({
      path: 'moments',
      model: 'Moment'
    }).exec(function (err, journey) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(journey);
    });
  });

  // GET Specific journey by userId
  // '/v1/journeys/byUserId/:userId'
  api.get('/byUserId/:userId', function (req, res) {
    _journey2.default.findOne({ 'userId': req.params.userId }).populate({
      path: 'moments',
      model: 'Moment'
    }).exec(function (err, journey) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(journey);
    });
  });

  // POST add new Journey
  // {
  //    userId: userId,
  //    title: 'RedFoo's Journey',
  // }
  // '/v1/journeys/addJourney'
  api.post('/addJourney', function (req, res) {
    var userId = req.body.userId;
    var title = req.body.title;

    if (title == null && userId == null) {
      res.status(409).json({ message: 'You must enter a Title Name and user id' });
      return;
    }
    _userData2.default.findById(userId, function (err, user) {
      if (err) {
        res.status(500).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      if (!user) {
        res.status(404).json({ message: 'User ID does not exist' });
        return;
      }
      var newJourney = new _journey2.default({
        userId: userId,
        title: title
      });
      newJourney.save(function (err) {
        if (err) {
          res.status(409).json({ message: 'An error occurred: ' + err.message });
          return;
        }
        _userData2.default.update({ _id: userId }, { $addToSet: { journeys: newJourney._id } }, function (err, user) {
          if (err) {
            res.status(500).json({ message: 'An error occurred: ' + err.message });
            return;
          }
          res.send(newJourney);
        });
      });
    });
  });

  return api;
};
//# sourceMappingURL=journey.js.map