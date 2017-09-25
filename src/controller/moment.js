'use strict';

import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { Router } from 'express';
import Moment from '../model/moment';
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
      .populate({
        path: 'location',
        model: 'Location'
      })
      .exec((err, moment) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(moment);
      });
  });

  // GET Specific moment by journeyId
  // '/v1/moments/byJourneyId/:journeyId'
  api.get('/byJourneyId/:journeyId', (req, res) => {
    Moment
      .findOne({ 'journeyId': req.params.userId })
      .populate({
          path: 'comments',
          model: 'Comment'
        })
      .populate({
        path: 'location',
        model: 'Location'
      })
      .exec((err, moment) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(moment);
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
    const journeyId = req.body.journeyId;
    const title = req.body.title;
    const description = req.body.description;
    const mediaUrls = req.body.mediaUrls;
    const location = req.body.location;

    if (journeyId == null) {
      res.status(409).json({ message: `You must enter a journey id` });
      return;
    }
      let newMoment = new Moment({
        journeyId: journeyId,
        title: title,
        description: description,
        mediaUrls: mediaUrls,
        location: location
      });
      newMoment.save(err => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
        } else {
          res.send(newMoment);
        }
      });
  });

  return api;
}
