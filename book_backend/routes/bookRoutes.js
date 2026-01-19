const express = require('express')
const router = express.Router()

const {addBooks,viewAllBooks, updateBook, deleteBook} = require('../controllers/bookController')
router.post('/addBook', addBooks);
router.get('/viewAllBooks', viewAllBooks)
router.put('/updateBook/:id', updateBook)
router.delete('/deleteBook/:id', deleteBook)
module.exports = router;