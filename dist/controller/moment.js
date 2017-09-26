'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _moment = require('../model/moment');

var _moment2 = _interopRequireDefault(_moment);

var _journey = require('../model/journey');

var _journey2 = _interopRequireDefault(_journey);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = Promise;

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // GET all moments
  // '/v1/moments'
  api.get('/', function (req, res) {
    _moment2.default.find().exec(function (err, moments) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(moments);
    });
  });

  // GET Specific moment byId
  // '/v1/moments/byId/:id'
  api.get('/byId/:id', function (req, res) {
    _moment2.default.findById(req.params.id).populate({
      path: 'comments',
      model: 'Comment'
    }).exec(function (err, moment) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(moment);
    });
  });

  // GET Specific moments by journeyId
  // '/v1/moments/byJourneyId/:journeyId'
  api.get('/byJourneyId/:journeyId', function (req, res) {
    _moment2.default.find({ 'journeyId': req.params.userId }).populate({
      path: 'comments',
      model: 'Comment'
    }).exec(function (err, moments) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(moments);
    });
  });

  // POST add new Moment
  // {
  //    journeyId: journeyId,
  //    title: 'RedFoo's Moment',
  //    description: "Cool stuff here",
  //    mediaUrls: ["www.image1.com"],
  //    location: location
  // }
  // '/v1/moments/addMoment'
  api.post('/addMoment', function (req, res) {
    var journeyId = req.body.journeyId;
    var title = req.body.title;
    var description = req.body.description;
    var mediaUrls = req.body.mediaUrls;
    var location = req.body.location;

    if (journeyId == null) {
      res.status(409).json({ message: 'You must enter a journey id' });
      return;
    }
    _journey2.default.findById(journeyId, function (err, journey) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }

      if (!journey) {
        res.status(404).json({ message: 'Journey ID does not exist' });
        return;
      }

      var newMoment = new _moment2.default({
        journeyId: journeyId,
        title: title,
        description: description,
        mediaUrls: mediaUrls,
        location: location
      });

      newMoment.save(function (err) {
        if (err) {
          res.status(409).json({ message: 'An error occurred: ' + err.message });
          return;
        }
        _journey2.default.update({ _id: journeyId }, { $addToSet: { moments: newMoment._id } }, function (err, journey) {
          if (err) {
            res.status(409).json({ message: 'An error occurred: ' + err.message });
            return;
          }
          res.send(newMoment);
        });
      });
    });
  });

  return api;
};
//# sourceMappingURL=moment.js.map