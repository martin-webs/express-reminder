const express = require('express');
const router = express.Router();
const database = require('../models/userModel').database;
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require('../middleware/checkAuth');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('reminder/index', {
    user: req.user,
    reminders: req.user.reminders,
  });
});

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('reminder/create');
});

router.post('/', ensureAuthenticated, (req, res) => {
  let reminder = {
    title: req.body.title,
    description: req.body.description,
    details: req.body.details,
    completed: false,
  };
  req.user.reminders.push(reminder);
  res.redirect('/reminder');
});

router.get('/:id', ensureAuthenticated, (req, res) => {
  let reminderToFind = req.user.reminders.find(
    (reminder) => reminder.id == req.params.id
  );
  if (reminderToFind != undefined) {
    res.render('reminder/single-reminder', {
      reminder: reminderToFind,
    });
  } else {
    res.redirect('/reminder');
  }
});

module.exports = router;
