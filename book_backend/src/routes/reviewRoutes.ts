import express from "express";
const router = express.Router();

import {
    addReview,
    viewAllReviews,
    editReview,
    deleteReview
} from "../controllers/reviewController";

router.post("/books/:bookId/addReview", addReview);
router.get("/books/viewAllReviews/:id", viewAllReviews)
router.patch("/books/editReview/:id", editReview);
router.delete("/books/deleteReview/:id", deleteReview);
export default router;