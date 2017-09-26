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
    .findById(req.params.id)
    .populate({
      path: 'journeys',
      model: 'Journey'
    })
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
    .populate({
      path: 'journeys',
      model: 'Journey'
    })
    .exec((err, userData) => {
      if (err) {
        res.status(409).json({ message: `An error occurred: ${err.message}` });
        return;
      }
      res.status(200).json(userData);
    });
});

// POST update user location
// {
//    userId: userId,
//    location: location
// }
// '/v1/userData/updateUserLocation'
api.post('/updateUserLocation', (req, res) => {
  const userId = req.body.userId;
  const location = req.body.location;

  if (userId == null || location == null) {
    res.status(409).json({ message: `You must enter a user id and location object` });
  }
  UserData.update({ _id: userId }, { $addToSet: { location: location} }, (err, user) => {
    if (err) {
      res.status(409).json({ message: `An error occurred: ${err.message}` });
      return;
    }
    res.status(200).json({ message: 'Location successfully updated'});
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

    if (displayName == null) {
      res.status(409).json({ message: `You must enter a Display name` });
      return;
    }

    let newUserData = new UserData({
      displayName: displayName
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
