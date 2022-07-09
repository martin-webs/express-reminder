const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const app = express();
const path = require('path');
const port = process.env.port || 3000;
const reminderRoute = require('./routes/reminderRoute');

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
app.use(express.json());
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

app.listen(port, () => console.log(`Server is running on port ${port}`));
