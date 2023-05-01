const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../Controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerUser).get(protect, getUser);
router.route('/login').post(loginUser);

module.exports = router;