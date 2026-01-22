import { Request, Response } from "express";
import Book from "../models/bookModel";

interface BookIBody {
    title: string;
    author: string;
    price: number;
}

export const addBooks = async (req: Request, res: Response) => {
    const {title, author, price} = req.body as BookIBody;
    try {
        Book.create({title, author, price})
        .then(book => res.send(book))
        .catch(error => res.json(error.message))
    } catch (error:any) {
        res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
    }
}

export const viewAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        if(books.length === 0){
            return res.status(404).json("No Books present in the library!")
        }
        return res.json(books)
    } catch (error:any) {
        res.status(500).json(error.message)
    }
}

export const viewSingleBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const book = await Book.findOne({_id: id});
        if(!book){
            return res.status(404).json("Book is not available!")
        }
        return res.json(book)
    } catch (error:any) {
        res.status(500).json(error.message)
    }
}

export const updateBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const existBook = await Book.findOne({_id:id});
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
        const updateDetails = await Book.findByIdAndUpdate(id, req.body, {new:true, runValidators: true})
        res.json({message: "Book updated",
            updateDetails
        });
    } catch (error:any) {
        res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const existBook = await Book.findOne({_id:id});
        if(!existBook){
            return res.status(404).json("Book history not found!")
        }
        const deleted = await Book.findByIdAndDelete(id);
        return res.json({message: "Book deleted successfully!", deleted});
    } catch (error:any) {
        return res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
    }
}