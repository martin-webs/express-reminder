const express = require('express');
const router = express.Router();
const database  = require('../models/userModel').database;

router.get('/', (req, res) => {
  res.render('reminder/index', { reminders: database[0].reminders });
	console.log(database[0].reminders)
});

module.exports = router;
