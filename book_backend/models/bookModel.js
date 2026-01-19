const { default: mongoose } = require("mongoose");

const BookSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please enter title!"]
    },
    author:{
        type: String,
        required: [true, "Please enter author!"]
    },
    price:{
        type: Number,
        required: [true, "Please enter price!"]
    }
})
const Book = mongoose.model("books", BookSchema);
module.exports = Book;