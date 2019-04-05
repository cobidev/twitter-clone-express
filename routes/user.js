const express = require('express');
const middlewares = require('../middlewares/index')
const router = express.Router();
const {
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getLogout
} = require('../controllers/user');

// GET /login
router.get('/login', getLogin);

// GET /signup
router.get('/signup', getSignup);

// POST /login
router.post('/login', postLogin);

// POST /signup
router.post('/signup', postSignup);

// GET /logout
router.get('/logout', middlewares.isLoggedIn, getLogout);

module.exports = router;