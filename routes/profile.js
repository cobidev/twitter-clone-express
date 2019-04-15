const express = require('express');
const middlewares = require('../middlewares/index')
const router = express.Router();
const {
  getMyProfile,
  getProfile,
  followUser,
  unfollowUser,
  destroyProfile
} = require('../controllers/profile');

// GET my profile - /profile/me
router.get('/me', middlewares.isLoggedIn, getMyProfile);

// DELETE my profile - /profile/me
router.delete('/me', middlewares.isLoggedIn, destroyProfile);

// GET profile - /profile/:id
router.get('/:id', getProfile);

// GET /profile/follow/:id
router.get('/follow/:id', middlewares.isLoggedIn, followUser);

// GET /profile/unfollow/:id
router.get('/unfollow/:id', middlewares.isLoggedIn, unfollowUser);

module.exports = router;
