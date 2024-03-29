const express = require('express');
const passport = require('../middleware/passport');
const { forwardAuthenticated, ensureAuthenticated } = require('../middleware/checkAuth');

const router = express.Router();

router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login', { user: undefined });
});

router.get('/admin', ensureAuthenticated, (req, res) => {
  res.render('admin', {
    req: req,
    user: req.user,
		sessions:  Object.keys(req.sessionStore.sessions)
  });
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

router.get('/revoke', (req, res, next) => {
  req.sessionStore.destroy(req.query.sid, err => {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/admin');
  })
  console.log('SessionID to be destroyed: ' + req.query.sid);
  console.log('Active SessionID \n' + Object.keys(req.sessionStore.sessions));
} )

module.exports = router;
