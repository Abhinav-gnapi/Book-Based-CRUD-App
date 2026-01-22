import Book from "../models/bookModel";
import { Review } from "../models/reviewModel";

export const updateBookReviewCount = async (bookId: string) => {
    const count = await Review.countDocuments({book: bookId});

    await Book.findByIdAndUpdate(bookId, {
        reviewCount: count
    });
};