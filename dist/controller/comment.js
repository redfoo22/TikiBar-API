'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _comment = require('../model/comment');

var _comment2 = _interopRequireDefault(_comment);

var _moment = require('../model/moment');

var _moment2 = _interopRequireDefault(_moment);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = Promise;

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // GET all comments
  // '/v1/comments'
  api.get('/', function (req, res) {
    _comment2.default.find().exec(function (err, comments) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(comments);
    });
  });

  // GET Specific comment byId
  // '/v1/comments/byId/:id'
  api.get('/byId/:id', function (req, res) {
    _comment2.default.findById(req.params.id).populate({
      path: 'comments',
      model: 'Comment'
    }).exec(function (err, comment) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(comment);
    });
  });

  // GET Specific comment by momentId
  // '/v1/comments/byMomentId/:momentId'
  api.get('/byMomentId/:momentId', function (req, res) {
    _comment2.default.find({ 'momentId': req.params.momentId }).populate({
      path: 'comments',
      model: 'Comment'
    }).exec(function (err, comment) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      res.status(200).json(comment);
    });
  });

  // POST add new Comment
  // {
  //    momentId: momentId,
  //    userId: userId,
  //    title: 'RedFoo's Comment',
  //    description: "Cool stuff here",
  //    mediaUrls: ["www.image1.com"],
  //    location: location
  // }
  // '/v1/comments/addComment'
  api.post('/addComment', function (req, res) {
    var momentId = req.body.momentId;
    var userId = req.body.userId;
    var userProfileImgUrl = req.body.userProfileImgUrl;
    var displayName = req.body.displayName;
    var text = req.body.text;

    if (momentId == null) {
      res.status(409).json({ message: 'You must enter a journey id' });
      return;
    }
    _moment2.default.findById(momentId, function (err, moment) {
      if (err) {
        res.status(409).json({ message: 'An error occurred: ' + err.message });
        return;
      }
      var newComment = new _comment2.default({
        momentId: momentId,
        userId: userId,
        userProfileImgUrl: userProfileImgUrl,
        displayName: displayName,
        text: text
      });
      newComment.save(function (err) {
        if (err) {
          res.status(409).json({ message: 'An error occurred: ' + err.message });
          return;
        }
        _moment2.default.update({ _id: momentId }, { $addToSet: { comments: newComment._id } }, function (err, moment) {
          if (err) {
            res.status(409).json({ message: 'An error occurred: ' + err.message });
            return;
          }
          res.send(newComment);
        });
      });
    });
  });

  return api;
};
//# sourceMappingURL=comment.js.map