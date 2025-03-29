const express = require('express');
const loginUser = require('../controllers/authController')

const router = express.Router();

router.get('/login',loginUser);

module.exports = router;