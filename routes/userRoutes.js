const express = require('express');
const {registerUser,getUserDetail,updateUser,deleteUser} = require('../controllers/userController');
const {validateToken} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register',registerUser);
router.patch('/update/:id',validateToken,updateUser);

module.exports = router;