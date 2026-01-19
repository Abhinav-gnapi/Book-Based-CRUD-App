const Book = require("../models/bookModel");

exports.addBooks = async (req, res) => {
    const {title, author, price} = req.body;
    try {
        Book.create({title, author, price})
        .then(book => res.send(book))
        .catch(error => res.json(error.message))
    } catch (error) {
        res.status(400).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
    }
}

exports.viewAllBooks = async (req,res) => {
    try {
        const books = await Book.find();
        if(books.length === 0){
            res.json("No Books present in the library!")
        }
        return res.json(books)
    } catch (error) {
        res.status(401).json(error.message)
    }
}

exports.updateBook = async (req,res) => {
    const id = req.params.id;
    try {
        const existBook = await Book.findOne({_id:id});
        if(!existBook){
            res.json("Book history not found!")
        }
        const updateDetails = await Book.findByIdAndUpdate(id, req.body, {new:true})
        res.json({message: "Book updated",
            updateDetails
        });
    } catch (error) {
        res.status(400).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
    }
}

exports.deleteBook = async (req,res) => {
    const id = req.params.id;
    try {
        const existBook = await Book.findOne({_id:id});
        if(!existBook){
            res.json("Book history not found!")
        }
        const deleted = await Book.findByIdAndDelete(id);
        return res.json({message: "Book deleted successfully!", deleted});
    } catch (error) {
        return res.status(400).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
    }
}