import mongoose from 'mongoose';
import UserData from '../../model/userData';

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

  static updateUserLocation = (userId, location) => {
    return new Promise((resolve, reject) => {
      UserData.update({ _id: userId }, { currentLocation: location })
      .exec((err, user) => {
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

}

export default UserDataExt;
