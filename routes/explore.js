const express = require('express');
const router = express.Router();
const {
  getExplore,
  postExplore
} = require('../controllers/explore');

// GET /explore
router.get('/', getExplore);

// POST /explore
router.post('/', postExplore);

module.exports = router;