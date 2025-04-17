const express = require('express');
const {setProfilePic,deletePicImages,deleteUserProfilePic,validateUserAuthority} = require('../controllers/imageController');
const imageMiddleware = require('../middleware/imageMiddleware');
const {validateToken} = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/upload',imageMiddleware.single('image'),setProfilePic);
router.delete('/delete/:id',validateToken,validateUserAuthority,deletePicImages,deleteUserProfilePic);

module.exports = router;