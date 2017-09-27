import mongoose from 'mongoose';
import UserData from '../../model/userData';
import Journey from '../../model/journey';

class UserDataExt {

  static findUserById = (userId) => {
    return new Promise((resolve, reject) => {
      UserData
      .findById(userId)
      .exec((err, user)=> {
        if (err) {
          reject("Error finding User.");
        }
        if (!user){
          reject("Unable to find User.");
        }
        resolve(user)
      });
    });
  }

  static findUserByDisplayName = (displayName) => {
    return new Promise((resolve, reject) => {
      UserData
      .findOne({ 'displayName': displayName })
      .exec((err, user)=> {
        if (err) {
          reject("Error finding User.");
        }
        if (!user){
          reject("Unable to find User.");
        }
        resolve(user)
      });
    });
  }

  static findUserByJourneyId = (journeyId) => {
    return new Promise((resolve, reject) => {
      Journey
        .findById(journeyId)
        .exec((err, journey)=> {
          if (err) {
            reject("Error finding Journey");
          }
          UserData
          .findById(journey.userId)
          .exec((err, user)=> {
            if (err) {
              reject("Error finding User.");
            }
            if (!user){
              reject("Unable to find User.");
            }
            resolve(user)
          });
        });
    });
  }

}

export default UserDataExt;
