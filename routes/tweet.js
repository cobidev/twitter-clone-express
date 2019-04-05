const express = require('express');
const middlewares = require('../middlewares/index')
const router = express.Router();
const {
  postTweet
} = require('../controllers/tweet');

// POST /tweet
router.post('/', middlewares.isLoggedIn, postTweet);

module.exports = router;