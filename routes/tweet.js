const express = require('express');
const middlewares = require('../middlewares/index');
const router = express.Router();
const { postTweet, deleteTweet } = require('../controllers/tweet');

// POST /tweet
router.post('/', middlewares.isLoggedIn, postTweet);

// Delete /tweet
router.delete('/', middlewares.isLoggedIn, deleteTweet);

module.exports = router;
