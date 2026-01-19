const express = require('express');
const { authController } = require('../controllers/authController');
const router = express.Router();
const { verifyUser } = require('../middleware/authMiddleware');

router.get("/me",verifyUser, authController);
module.exports = router;
