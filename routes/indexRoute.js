const express = require('express');
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require('../middleware/checkAuth');

// router.get('/', (req, res) => {
//   res.send('Hello from indexRoute');
// });

// router.get('/dashboard', ensureAuthenticated, (req, res) => {
//   res.render('dashboard', {
//     user: req.user,
//   });
// });

module.exports = router;
