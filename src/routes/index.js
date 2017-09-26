'use strict';

import express from 'express';
import config from '../config';
import initializeDb from '../db';
import userData from '../controller/userData';
import journeys from '../controller/journey';
import moments from '../controller/moment';
import comments from '../controller/comment';

let router = express();

// connect to db
initializeDb( db => {

	// ping route for connectivity monitoring
	router.get('/ping', (req, res) => {
		res.status(200).json({ status: "OK", message: "I'm alive baby!" });
	});

	// api routes v1 (/v1)
	router.use('/userData', userData({ config, db }));
	router.use('/journeys', journeys({ config, db }));
	router.use('/moments', moments({ config, db }));
	router.use('/comments', comments({ config, db }));
});

export default router;
