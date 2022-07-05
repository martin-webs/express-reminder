const express = require('express');
const passport = require('../middleware/passport');
const { forwardAuthenticated } = require('../middleware/checkAuth');
const router = express.Router();

router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login', { user: undefined });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/reminder',
    failureRedirect: '/auth/login',
  })
);

router.post(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/reminder');
  });


router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/login');
  });
});

router.get('/auth/revoke', )

module.exports = router;
