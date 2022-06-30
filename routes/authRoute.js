const express = require('express');
const passport = require('../middleware/passport');
const router = express.Router();
const { forwardAuthenticated } = require('../middleware/checkAuth');

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
  })
);

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/auth/login');
})

module.exports = router;