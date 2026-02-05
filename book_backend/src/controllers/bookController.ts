import { Request, Response } from "express";
import Book from "../models/bookModel";
import BookI from "../interfaces/book.interface";
import { buildPagination } from "../utility/book.pagination";
import { buildFilter } from "../utility/book.filter";
import { buildSort } from "../utility/book.sort";

export const addBooks = async (req: Request, res: Response) => {
    const {title, author,publicationYear, genre, price} = req.body as BookI;
    try {
        if (!title || !author || !publicationYear || !Array.isArray(genre) || genre.length === 0 || price === undefined){
            return res.status(400).json({success: false, message: "Enter title, author, publicationYear, genre(inside an array) and price!"});
        }
        const existBook = await Book.findOne({title: title})
        if(existBook) {
            return res.status(200).json({success: false, message: "Already exist!", item: existBook})
        }
        const createdBook = await Book.create({title, author,publicationYear,genre, price})
        res.status(201).json({success: false, message: "Book added", item: createdBook});
    } catch (error:any) {
        return res.status(500).json({
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}


export const viewAllBooks = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = buildPagination(
      req.query.page as string,
      req.query.limit as string
    );

    const sortOptions = buildSort(
      req.query.sortBy as string,
      req.query.order as string
    );

    const filter = buildFilter(req.query.genre as string);

    const books = await Book.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalBooks = await Book.countDocuments(filter);

    if (!books.length) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json({
      page,
      limit,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      books,
    });
  } catch (error: any) {
    return res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
  }
};

export const viewSingleBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({success: false, message: "Book ID required" });
        }
        const book = await Book.findOne({_id: id});
        if(!book){
            return res.status(404).json({success: false, message:"Book is not available!"})
        }
        return res.json({book})
    } catch (error:any) {
        return res.status(500).json({
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}

export const updateBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {
        if (!bookId) {
            return res.status(400).json({success: false, message: "Book ID required" });
        }
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "Request body cannot be empty" });
        }
        const existBook = await Book.findById(bookId);
        if(!existBook){
            return res.status(404).json({ success: false, message: "Book not found" })
        }

        const isSame = Object.keys(req.body).every((key) => {
            const existValue = (existBook as any)[key];
            const newValue = req.body[key];

            if (Array.isArray(existValue) && Array.isArray(newValue)) {
                return JSON.stringify(existValue.sort()) === JSON.stringify(newValue.sort());
            }
            
            return String(existValue) === String(newValue);
        });

        if (isSame) {
            return res.status(400).json({
                success: false,
                message: "No changes detected. Data is already up to date.",
            });
        }
        const updateDetails = await Book.findByIdAndUpdate(bookId, req.body, {new:true, runValidators: true})
        res.json({
            success: true,
            message: "Book updated",
            updateDetails
        });
    } catch (error:any) {
        console.error("Update book error:", error);
        return res.status(500).json({
            success: false,
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {
        if (!bookId) {
            return res.status(400).json({success:false, message: "Book ID required" });
        }
        const existBook = await Book.findById(bookId);
        if(!existBook){
            return res.status(404).json({success:true, message: "Book history not found!"})
        }

        await Book.findByIdAndDelete(bookId);
        return res.json({ 
            success: true, 
            message: "Book deleted successfully",
            deletedBook: existBook 
        });
    } catch (error:any) {
        console.error("Delete book error:", error);
        return res.status(500).json({
            success: false,
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}