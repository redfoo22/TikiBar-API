'use strict';

import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { Router } from 'express';
import Moment from '../model/moment';
import Journey from '../model/journey';
import bodyParser from 'body-parser';

export default ({ config, db }) => {
  let api = Router();

  // GET all moments
  // '/v1/moments'
  api.get('/', (req, res) => {
    Moment
      .find()
      .exec((err, moments) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(moments);
      });
  });

  // GET Specific moment byId
  // '/v1/moments/byId/:id'
  api.get('/byId/:id', (req, res) => {
    Moment
      .findById(req.params.id)
      .populate({
          path: 'comments',
          model: 'Comment'
        })
      .exec((err, moment) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(moment);
      });
  });

  // GET Specific moments by journeyId
  // '/v1/moments/byJourneyId/:journeyId'
  api.get('/byJourneyId/:journeyId', (req, res) => {
    Moment
      .find({ 'journeyId': req.params.journeyId })
      .populate({
          path: 'comments',
          model: 'Comment'
        })
      .exec((err, moments) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
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
  api.post('/addMoment', (req, res) => {
    const momentId = req.body.newMomentId
    const journeyId = req.body.journeyId;
    const title = req.body.title;
    const description = req.body.description;
    const mediaUrls = req.body.mediaUrls;
    const location = req.body.location;

    if (momentId == null || journeyId == null) {
      res.status(409).json({ message: `You must enter a journey id` });
      return;
    }
    Journey
      .findById(journeyId, (err, journey) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }

        if (!journey) {
          res.status(404).json({ message: `Journey ID does not exist` });
          return;
        }

        let newMoment = new Moment({
          _id: momentId,
          journeyId: journeyId,
          title: title,
          description: description,
          mediaUrls: mediaUrls,
          location: location
        });

        newMoment.save(err => {
          if (err) {
            res.status(409).json({ message: `An error occurred: ${err.message}` });
            return;
          }
          Journey.update({ _id: journeyId }, { $addToSet: { moments: newMoment._id } }, (err, journey) => {
            if (err) {
              res.status(409).json({ message: `An error occurred: ${err.message}` });
              return;
            }
            res.send(newMoment);
        });
      });
    });
  });

  return api;
}
