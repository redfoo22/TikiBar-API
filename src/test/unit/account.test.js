'use strict';

import should from 'should';
import mongoose from 'mongoose';

let Account = require('../../model/account');
import initializeDb from '../../db';

initializeDb( db => {
  describe('Account', () => {

    beforeEach((done) => {
      let account = new Account({
        email: 'test@devslopes.com',
        password: 'testy'
      });

      account.save((error) => {
        if (error) console.log('error' + error.message);
        else console.log('no error');
        done();
      });
    });

    it('find a user by email', (done) => {
      Account.findOne({ email: 'test@devslopes.com' }, function(err, account) {
        account.email.should.eql('test@devslopes.com');
        console.log("       email: ", account.email);
        done();
      });
    });

    afterEach((done) => {
      Account.remove({ email: 'test@devslopes.com' }, () => {
        done();
      });
    });
  });
});
