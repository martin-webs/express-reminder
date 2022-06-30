const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const app = express();
const path = require('path');
const port = process.env.port || 3000;

const reminderRoute = require('./routes/reminderRoute');
// const reminderController = require('./controllers/reminder_controller');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require('./middleware/passport');
const indexRoute = require('./routes/indexRoute');
const authRoute = require('./routes/authRoute');

app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log('User details are: ');
  console.log(req.user);
  console.log('Entire session object:');
  console.log(req.session);
  console.log('Session details are: ');
  console.log(req.session.passport);
  next();
});

// case 1: user goest to <localhost:3000/  -> Homepage or Landing page
app.use('/', indexRoute);
app.use('/auth', authRoute);
// case 2: user goes to localhost:8000/reminder  -> show a list of reminders
app.use('/reminder', reminderRoute);

// case 3: user goes to localhost:8000/reminder/new  -> show a CREATE REMINDER PAGE
// app.get('/reminder/new', reminderRoute);

// case 4: user sends reminder data to us (creates a reminder)
// app.use('/reminder', reminderRoute);

// case 5: user wants to see an individual reminder
// app.get('/reminder/:id', reminderController.listOne);

// case 6: user want to edit an existing reminder
// app.get('/reminder/:id/edit', reminderController.edit);

// case 7: user sends updates reminder to us (edits a reminder)
// app.put('/reminder/:id/edit', reminderController.update);

// case 8: user deletes a reminder
// app.get('/reminder/:id/delete', reminderController.delete);

// case 9: user cancels the edit
// app.get('/reminder/:id/cancel', reminderController.cancel);

app.listen(port, () => console.log(`Server is running on port ${port}`));
