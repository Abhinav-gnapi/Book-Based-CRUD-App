const express = require('express');
const cors = require('cors');
const app = express();
require("./db");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
 
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())
 
app.get('/', (req, res) => {
    res.json("Message from server API: MongoDB Connected Successfully");
});

const userRoutes = require('./routes/userRoutes')
app.use('/', userRoutes)

const {verifyUser} = require('./middleware/authMiddleware')
app.get('/home',verifyUser, (req,res) => {
    return res.json("Success")
})

app.get('/admin/addBook', (req,res) => {
    res.send("Add Book");
})

app.get('/admin/updateBook', (req,res) => {
    res.send("Update Book");
})

app.get('/admin/deleteBook', (req,res) => {
    res.send("Delete Book");
})

app.get('/user', (req,res) => {
    res.send("User page");
})

app.get('/user/viewAllBooks', (req,res) => {
    res.send("viewAllBooks");
})
app.get('/user/viewAllBooks/:name', (req,res) => {
    res.send("View single book details");
})

app.get('/user/addReview', (req,res) => {
    res.send("add Review");
})

app.get('/user/editReview', (req,res) => {
    res.send("edit Review");
})

app.get('/user/deleteReview', (req,res) => {
    res.send("delete Review");
})

app.get('/user/wishlist', (req,res) => {
    res.send("User Wishlist");
})

app.get('/user/addWishlist', (req,res) => {
    res.send("add Wishlist");
})

app.get('/user/removeWishlist', (req,res) => {
    res.send("Remove from Wishlist");
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
