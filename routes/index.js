const express = require('express');
const { getHome } = require('../controllers/home');
const router = express.Router();

// GET / - Homepage
router.get('/', getHome);

module.exports = router;