let Database = require('../Database');

let reminderController = {
  // hello: (req, res) => res.send('Hello World'),
  list: (req, res) =>
    res.render('reminder/index', { reminders: Database.cindy.reminders }),
  new: (req, res) => res.render('reminder/create'),
  create: (req, res) => {
    let reminder = {
      id: Database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      details: req.body.details,
      completed: false,
    };
    Database.cindy.reminders.push(reminder);
    res.redirect('/reminder');
  },
  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find(
      (reminder) => reminder.id == reminderToFind
    );
    if (searchResult != undefined) {
      res.render('reminder/single-reminder', { reminderItem: searchResult });
    } else {
      res.redirect('/reminder');
    }
  },
  edit: (req, res) => {
    let reminderToEdit = req.params.id;
    let searchResult = Database.cindy.reminders.find(
      (reminder) => reminder.id == reminderToEdit
    );
    if (searchResult != undefined) {
      res.render('reminder/edit', { reminderItem: searchResult });
      Database.cindy.reminders.splice(
        Database.cindy.reminders.indexOf(searchResult)
      );
    } else {
      res.redirect('/reminder');
    }
  },
  update: (req, res) => {
    let reminder = {
      id: req.params.id,
      title: req.params.title,
      description: req.params.description,
      details: req.params.details,
      completed: false,
    };
    Database.cindy.reminders.push(reminder);
    res.redirect('/reminder');
  },
  delete: (req, res) => {
    let reminderToDelete = req.params.id;
    let searchResult = Database.cindy.reminders.find(
      (reminder) => reminder.id == reminderToDelete
    );
    if (searchResult != undefined) {
      Database.cindy.reminders.splice(
        Database.cindy.reminders.indexOf(searchResult),1
      );
      res.redirect('/reminder/index');
    } else {
      res.redirect('/reminder');
    }
  },
  cancel: (req, res) => {
    res.redirect('/reminder/' + req.params.id);
  },
};
module.exports = reminderController;
