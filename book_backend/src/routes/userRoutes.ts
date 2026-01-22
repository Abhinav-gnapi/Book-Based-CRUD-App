// const express = require('express');
// const router = express.Router();

// const { registerUser, loginUser, logoutUser } = require('../controllers/userController');

// router.post('/register', registerUser);
// router.post('/login', loginUser)
// router.post('/logout', logoutUser)

// module.exports = router;

import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";
import { verifyUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",verifyUser, logoutUser);

export default router;
