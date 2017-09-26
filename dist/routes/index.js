'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _userData = require('../controller/userData');

var _userData2 = _interopRequireDefault(_userData);

var _journey = require('../controller/journey');

var _journey2 = _interopRequireDefault(_journey);

var _moment = require('../controller/moment');

var _moment2 = _interopRequireDefault(_moment);

var _comment = require('../controller/comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

// connect to db
(0, _db2.default)(function (db) {

	// ping route for connectivity monitoring
	router.get('/ping', function (req, res) {
		res.status(200).json({ status: "OK", message: "I'm alive baby!" });
	});

	// api routes v1 (/v1)
	router.use('/userData', (0, _userData2.default)({ config: _config2.default, db: db }));
	router.use('/journeys', (0, _journey2.default)({ config: _config2.default, db: db }));
	router.use('/moments', (0, _moment2.default)({ config: _config2.default, db: db }));
	router.use('/comments', (0, _comment2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map