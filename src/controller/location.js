'use strict';

import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { Router } from 'express';
import Location from '../model/location';
import bodyParser from 'body-parser';

export default ({ config, db }) => {
  let api = Router();

  // GET all locations
  // '/v1/locations'
  api.get('/', (req, res) => {
    Location
      .find()
      .exec((err, locations) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(locations);
      });
  });

  // GET Specific location byId
  // '/v1/locations/byId/:id'
  api.get('/byId/:id', (req, res) => {
    Location
      .findById(req.params.id)
      .exec((err, location) => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
          return;
        }
        res.status(200).json(location);
      });
  });

  // POST add new Location
  // {
  //    latitude: latitude,
  //    longitude: longitude
  // }
  // '/v1/locations/addLocation'
  api.post('/addLocation', (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    if (latitude == null || longitude == null) {
      res.status(409).json({ message: `You must enter a latitude and longitude` });
      return;
    }
      let newLocation = new Location({
        longitude: longitude,
        longitude: longitude
      });
      newLocation.save(err => {
        if (err) {
          res.status(409).json({ message: `An error occurred: ${err.message}` });
        } else {
          res.send(newLocation);
        }
      });
  });

  return api;
}
