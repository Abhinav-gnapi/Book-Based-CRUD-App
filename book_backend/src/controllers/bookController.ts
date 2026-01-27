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
            return res.status(400).json("Enter title, author, publicationYear, genre(inside an array) and price!");
        }
        const existBook = await Book.findOne({title: title})
        if(existBook) {
            return res.status(200).json({message: "Already exist!", item: existBook})
        }
        const createdBook = await Book.create({title, author,publicationYear,genre, price})
        res.status(201).json({message: "Book added", item: createdBook});
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
            return res.status(400).json({ message: "Book ID required" });
        }
        const book = await Book.findOne({_id: id});
        if(!book){
            return res.status(404).json("Book is not available!")
        }
        return res.json(book)
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
            return res.status(400).json({ message: "Book ID required" });
        }
        const existBook = await Book.findOne({_id:bookId});
        if(!existBook){
            return res.status(404).json("Book history not found!")
        }
        if(!req.body){
            return res.status(404).json("Nothing in the request body")
        }

        const isSame = Object.keys(req.body).every((key) => {
            return req.body[key] == (existBook as any)[key];
        });

        if (isSame) {
            return res.status(400).json({
                message: "No changes detected. Data is already up to date.",
            });
        }
        const updateDetails = await Book.findByIdAndUpdate(bookId, req.body, {new:true, runValidators: true})
        res.json({message: "Book updated",
            updateDetails
        });
    } catch (error:any) {
        return res.status(500).json({
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {
        if (!bookId) {
            return res.status(400).json({ message: "Book ID required" });
        }
        const existBook = await Book.findOne({_id:bookId});
        if(!existBook){
            return res.status(404).json("Book history not found!")
        }
        const deleted = await Book.findByIdAndDelete(bookId);
        return res.json({message: "Book deleted successfully!", deleted});
    } catch (error:any) {
        return res.status(500).json({
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}