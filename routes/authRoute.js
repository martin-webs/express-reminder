const express = require('express');
const passport = require('../middleware/passport');
const { forwardAuthenticated, ensureAuthenticated } = require('../middleware/checkAuth');
const router = express.Router();

router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login', { user: undefined });
});

router.post('/admin', ensureAuthenticated, (req, res) => {
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

router.get('/revoke', (req, res, next) => {
  // req.sessionStore.destroy(req.revokedKey, err => {
  //   if (err) {
  //     return next(err);
  //   }
  //   // res.redirect('/admin');
  //   console.log('SessionID to be destroyed: ' + req.revokedKey);
  //   console.log('Session revoked');
  // })
  console.log('Active SessionID \n' + Object.keys(req.sessionStore.sessions));
  // res.redirect('/admin',  {
  //   user: req.user,
	// 	sessions:  Object.keys(req.sessionStore.sessions)
  // });
} )

module.exports = router;
