import express from 'express'
const router = express.Router()

import {
    addBooks,
    viewAllBooks,
    updateBook,
    viewSingleBook,
    deleteBook
} from "../controllers/bookController";

router.post('/addBook', addBooks);
router.get('/viewAllBooks', viewAllBooks)
router.get('/viewSingleBook/:id', viewSingleBook)
router.patch('/updateBook/:id', updateBook)
router.put('/updateBook/:id', updateBook)
router.delete('/deleteBook/:id', deleteBook)

export default router;