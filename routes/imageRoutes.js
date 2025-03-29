const express = require('express');
const {setProfilePic} = require('../controllers/imageController');
const imageMiddleware = require('../middleware/imageMiddleware');

const router = express.Router();

router.post('/upload',imageMiddleware.single('image'),setProfilePic);

module.exports = router;