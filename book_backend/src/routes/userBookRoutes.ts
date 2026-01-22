import express from "express";
const router = express.Router();

import {
    viewAllBooks,
    viewSingleBook
} from "../controllers/bookController";
import { authController } from "../controllers/authController";

router.get("/viewAllBooks", viewAllBooks);
router.get("/viewSingleBook/:id", viewSingleBook);
export default router;