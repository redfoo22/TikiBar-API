'use strict';

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Account = require('../../model/account');


(0, _db2.default)(function (db) {
  describe('Account', function () {

    beforeEach(function (done) {
      var account = new Account({
        email: 'test@devslopes.com',
        password: 'testy'
      });

      account.save(function (error) {
        if (error) console.log('error' + error.message);else console.log('no error');
        done();
      });
    });

    it('find a user by email', function (done) {
      Account.findOne({ email: 'test@devslopes.com' }, function (err, account) {
        account.email.should.eql('test@devslopes.com');
        console.log("       email: ", account.email);
        done();
      });
    });

    afterEach(function (done) {
      Account.remove({ email: 'test@devslopes.com' }, function () {
        done();
      });
    });
  });
});
//# sourceMappingURL=account.test.js.map