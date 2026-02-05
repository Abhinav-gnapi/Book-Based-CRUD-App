import { Request, Response } from "express";
import { Review } from "../models/reviewModel";
import { updateBookReviewCount } from "../utility/updateReviewCount";
import Book from "../models/bookModel";

export const addReview = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.id;
        const { bookId } = req.params;
        if (!bookId) {
            return res.status(400).json({ message: "Book ID required" });
        }
        if (!bookId || Array.isArray(bookId)) {
            return res.status(400).json({ message: "Invalid book id" });
        }
        const {rating, comment} = req.body;

        const review = await Review.create({
            book: bookId,
            user: userId,
            rating,
            comment
        });
        await updateBookReviewCount(bookId);

        res.status(201).json({ message: "Review added", review });
    } catch (error:any) {
        res.status(500).json({
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}

export const viewAllReviews = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;
        if (!bookId) {
            return res.status(400).json({ message: "Book ID required" });
        }
        const reviews = await Review.find({book: bookId});
        if(reviews.length === 0) {
            return res.status(404).json("No reviews for the book!");
        }
        return res.status(200).json(reviews)
    } catch (error:any) {
        res.status(500).json({
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}

export const editReview = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const reviewId = req.params.id;
        if (!reviewId) {
            return res.status(400).json({ message: "review ID required" });
        }
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You cannot edit this review" });
        }

        const updateDetails = await Review.findByIdAndUpdate(reviewId, req.body, {new:true, runValidators: true})
        res.json({message: "Review updated",
            updateDetails
        });
    } catch (error:any) {
        res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
    }
}


export const deleteReview = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const reviewId = req.params.id;
        if (!reviewId) {
            return res.status(400).json({ message: "review ID required" });
        }
        
        const existReview = await Review.findById(reviewId);
        if(!existReview){
            return res.status(404).json("Review not found!")
        }
        if (existReview.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You cannot delete this review" });
        }
        const deleted = await Review.findByIdAndDelete(reviewId);
        return res.json({message: "Review deleted successfully!", deleted});
    } catch (error:any) {
        return res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
    }
}