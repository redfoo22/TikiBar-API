'use strict';

import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { Router } from 'express';
import Journey from '../model/journey';
import UserData from '../model/userData';
import bodyParser from 'body-parser';

export default ({ config, db }) => {
  let api = Router();

  // GET all journeys
  // '/v1/journeys'
  api.get('/', (req, res) => {
    Journey
      .find()
      .exec((err, journeys) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(journeys);
      });
  });

  // GET Specific journey byId
  // '/v1/journeys/byId/:id'
  api.get('/byId/:id', (req, res) => {
    Journey
      .findById(req.params.id)
      .populate({
          path: 'moments',
          model: 'Moment'
        })
      .exec((err, journey) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(journey);
      });
  });

  // GET Specific journey by userId
  // '/v1/journeys/byUserId/:userId'
  api.get('/byUserId/:userId', (req, res) => {
    Journey
      .findOne({ 'userId': req.params.userId })
      .populate({
          path: 'moments',
          model: 'Moment'
        })
      .exec((err, journey) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(journey);
      });
  });

  // POST add new Journey
  // {
  //    userId: userId,
  //    title: 'RedFoo's Journey',
  //    moments: [Moment],
  // }
  // '/v1/journeys/addJourney'
  api.post('/addJourney', (req, res) => {
    const userId = req.body.userId;
    const title = req.body.title;

    if (title == null && userId == null) {
      res.status(409).json({ message: `You must enter a Title Name and user id` });
      return;
    }
    UserData
      .findById(userId, (err, user) => {
        if (err) {
          res.status(500).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        if (!user) {
          res.status(404).json({ message: `User ID does not exist` });
          return;
        }
        let newJourney = new Journey({
          userId: userId,
          title: title
        });
        newJourney.save(err => {
          if (err) {
            res.status(409).json({ message: `An error occurred: ${err.message}` });
            return;
          }
          UserData.update({ _id: userId }, { $addToSet: { journeys: newJourney._id } }, (err, user) => {
            if (err) {
              res.status(500).json({ message: `An error occurred: ${err.message}` });
              return;
            }
            res.send(newJourney);
        });
      });
    });
  });

  return api;
}
