// const express = require('express');
// const { authController } = require('../controllers/authController');
// const router = express.Router();
// const { verifyUser } = require('../middleware/authMiddleware');

// router.get("/me",verifyUser, authController);
// module.exports = router;


import express from "express";
import { authController } from "../controllers/authController";
import { verifyUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", verifyUser, authController);

export default router;
