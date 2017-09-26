'use strict';

import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { Router } from 'express';
import Comment from '../model/comment';
import Moment from '../model/moment';
import bodyParser from 'body-parser';

export default ({ config, db }) => {
  let api = Router();

  // GET all comments
  // '/v1/comments'
  api.get('/', (req, res) => {
    Comment
      .find()
      .exec((err, comments) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(comments);
      });
  });

  // GET Specific comment byId
  // '/v1/comments/byId/:id'
  api.get('/byId/:id', (req, res) => {
    Comment
      .findById(req.params.id)
      .populate({
          path: 'comments',
          model: 'Comment'
        })
      .exec((err, comment) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(comment);
      });
  });

  // GET Specific comment by momentId
  // '/v1/comments/byMomentId/:momentId'
  api.get('/byMomentId/:momentId', (req, res) => {
    Comment
      .find({ 'momentId': req.params.momentId })
      .populate({
          path: 'comments',
          model: 'Comment'
        })
      .exec((err, comment) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
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
  api.post('/addComment', (req, res) => {
    const momentId = req.body.momentId;
    const userId = req.body.userId;
    const userProfileImgUrl = req.body.userProfileImgUrl;
    const displayName = req.body.displayName;
    const text = req.body.text;

    if (momentId == null) {
      res.status(409).json({ message: `You must enter a journey id` });
      return;
    }
    Moment
      .findById(momentId, (err, moment) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        let newComment = new Comment({
            momentId: momentId,
            userId: userId,
            userProfileImgUrl: userProfileImgUrl,
            displayName: displayName,
            text: text
        });
        newComment.save(err => {
          if (err) {
            res.status(409).json({ message: `An error occurred: ${err.message}` });
            return;
          }
          Moment.update({ _id: momentId }, { $addToSet: { comments: newComment._id } }, (err, moment) => {
            if (err) {
              res.status(409).json({ message: `An error occurred: ${err.message}` });
              return;
            }
            res.send(newComment);
        });
      });
    });
  });

  return api;
}
