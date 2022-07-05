const express = require('express');
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require('../middleware/checkAuth');

router.get('/x/admin', ensureAuthenticated, (req, res) => {
  res.render('admin', {
    user: req.user,
		sessions:  Object.keys(req.sessionStore.sessions)
  });
});

module.exports = router;
