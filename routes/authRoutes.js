const express = require('express');
const { getToken } = require('../controllers/authController');

const router = express.Router();

// POST /getToken - Authenticate user and return a JWT
router.post('/getToken', getToken);

module.exports = router;
