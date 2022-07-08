const express = require('express');
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require('../middleware/checkAuth');


module.exports = router;
