const express = require('express');
const middlewares = require('../middlewares/index')
const router = express.Router();
const {
  getMyProfile,
  getProfile,
  followUser,
  unfollowUser
} = require('../controllers/profile');

// GET /profile/me
router.get('/me', middlewares.isLoggedIn, getMyProfile);

// GET /profile/:id
router.get('/:id', getProfile);

// GET /profile/follow/:id
router.get('/follow/:id', middlewares.isLoggedIn, followUser);

// GET /profile/unfollow/:id
router.get('/unfollow/:id', middlewares.isLoggedIn, unfollowUser);

module.exports = router;
