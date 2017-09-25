import mongoose from 'mongoose';
import UserData from '../../model/userData';

export const StudentType = {
  STANDARD: 0,
  UDEMY_REDEMPTION: 1,
  MAIN_COURSES: 2,
  ALL_COURSES: 3,
  LIFETIME: 4,
  ADMIN: 5
};

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

  static findUserByEmail(email, callback) {
    UserData.findOne({ 'email': email }, (err, userData) => {
      if (err) {
        return callback(err, null);
      } else{
        return callback(null, userData);
      }
    });
  }

  static findUserBySubscriptionId(subId, callback) {
    UserData.findOne({ 'subscriptionId': subId }, (err, userData) => {
      if (err) {
        return callback(err, null);
      } else{
        return callback(null, userData);
      }
    });
  }
}

export default UserDataExt;
