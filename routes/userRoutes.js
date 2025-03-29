const express = require('express');
const {registerUser,getUserDetail,updateUser,deleteUser} = require('../controllers/userController')

const router = express.Router();

router.post('/register',registerUser);
router.patch('/update/:id',updateUser);

module.exports = router;