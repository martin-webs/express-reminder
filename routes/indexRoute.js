const express = require('express');
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require('../middleware/checkAuth');

// router.get('/dashboard', ensureAuthenticated, (req, res) => {
//   res.render('dashboard', {
//     user: req.user,
//   });
// });

module.exports = router;
