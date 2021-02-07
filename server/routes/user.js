const express = require('express');
const router = express.Router();

const { fetchUser } = require('../controllers/user.js');

// @desc retrieve current user
// @route GET /user/
router.get('/', fetchUser);

module.exports = router;
