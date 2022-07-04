const express = require('express');
const router = express.Router();
const database = require('../models/userModel').database;
const { ensureAuthenticated } = require('../middleware/checkAuth');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('reminder/index', {
    user: req.user,
    reminders: req.user.reminders,
    
  });
});

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('reminder/create', { user: req.user });
});

router.post('/', ensureAuthenticated, (req, res) => {
  let reminder = {
    reminderId: req.user.reminders.length + 1,
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
    (reminder) => reminder.reminderId == req.params.id
  );
  if (reminderToFind != undefined) {
    res.render('reminder/single-reminder', {
      reminder: reminderToFind,
      user: req.user
    });
  } else {
    res.redirect('/reminder');
  }
});

router.get('/:id/edit', ensureAuthenticated, (req, res) => {
  let reminderToFind = req.user.reminders.find(
    (reminder) => reminder.reminderId == req.params.id
  );
  if (reminderToFind != undefined) {
    res.render('reminder/edit', {
      reminder: reminderToFind,
      user: req.user
    });
    req.user.reminders.splice(req.user.reminders.indexOf(reminderToFind), 1);
  } else {
    res.redirect('/reminder');
  }
});

router.post('/:id/edit', ensureAuthenticated, (req, res) => {
  let reminder = {
    reminderId: req.params.id,
    title: req.body.title,
    description: req.body.description,
    details: req.body.details,
    completed: false,
  };
  if (reminder != undefined) {
    req.user.reminders.push(reminder);
  }
  res.redirect('/reminder');
});

router.get('/:id/delete', ensureAuthenticated, (req, res) => {
  let reminderToFind = req.user.reminders.find(
    (reminder) => reminder.reminderId == req.params.id
  );
  if (reminderToFind != undefined) {
    req.user.reminders.splice(req.user.reminders.indexOf(reminderToFind), 1);
  }
  res.redirect('/reminder');
});

module.exports = router;
