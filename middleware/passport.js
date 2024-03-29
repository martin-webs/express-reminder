const { config } = require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const userController = require('../controllers/userController');

const id = process.env.GITHUB_CLIENT_ID;
const secret = process.env.GITHUB_CLIENT_SECRET;
const callbackURL = process.env.GITHUB_CALLBACK_URL;
const localLogin = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: 'Your login details are not valid. Please try again.',
        });
  }
);

const githubLogin = new GitHubStrategy(
  {
    clientID: id,
    clientSecret: secret,
    callbackURL: callbackURL,
  },
  function (accessToken, refreshToken, profile, done) {
    let user = userController.getUserByGithubIdOrCreate(profile)
    return done(null, user)
  }
);


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    console.log('User found via desializeUser: ' + user.id);
    done(null, user);
  } else {
    done({ message: 'User not found' }, null);
  }
});

module.exports = passport.use(localLogin);
module.exports = passport.use(githubLogin);
