'use strict';

import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { Router } from 'express';
import UserData from '../model/userData';
import bodyParser from 'body-parser';
import UserDataExt from './extensions/userData-ext';

export default ({ config, db }) => {
  let api = Router();

  // GET all userData
  // '/v1/userData'
  api.get('/', (req, res) => {
    UserData
      .find()
      .exec((err, userData) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(userData);
      });
  });

  // GET Specific users userData byId
  // '/v1/userData/byId/:id'
  api.get('/byId/:id', (req, res) => {
    UserData
      .find({ _id: req.params.id })
      .exec((err, userData) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(userData);
      });
  });

  // GET Specific users by displayName
// '/v1/userData/byDisplayName/:displayName'
api.get('/byDisplayName/:displayName', (req, res) => {
  UserData
    .findOne({ 'displayName': req.params.displayName })
    .exec((err, userData) => {
      if (err) {
        res.status(409).json({ message: `An error occurred: ${err.message}` });
        return;
      }
      res.status(200).json(userData);
    });
});

  // POST add new user
  // {
  //    displayName: 'RedFoo',
  //    profileImageUrl: 'www.myProfileImage.com',
  // }
  // '/v1/userData/addUser'
  api.post('/addUser', (req, res) => {
    const displayName = req.body.displayName;
    const profileImageUrl = req.body.profileImageUrl;
    if (displayName == null) {
      res.status(409).json({ message: `You must enter a Display name` });
      return;
    }
      let newUserData = new UserData({
        displayName: displayName,
        profileImageUrl: profileImageUrl
      });
      newUserData.save(err => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
        } else {
          res.send(newUserData);
        }
      });
  });

  return api;
}
