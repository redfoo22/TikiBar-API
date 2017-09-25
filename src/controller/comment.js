'use strict';

import  mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Comment from '../model/comment';

export default ({ config, db }) => {
  let api = Router();

  // Get with Lesson Id
  //  '/v1/comments/:lessonId`
  api.get('/:lessonId', (req, res) => {
    CommentExt.getComments(req.params.lessonId)
    .then(comments => {
      res.send(comments);
    })
    .catch(err => {
      res.status(409).json({message: err});
    });
  });

  // post comment with Lesson Id
  //  '/v1/comments/comment/:lessonId`
  api.post('/comment/:lessonId', (req, res) => {

  });


  return api;
}
