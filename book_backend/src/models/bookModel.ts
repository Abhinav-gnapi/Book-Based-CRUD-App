import mongoose, {Document, Schema} from 'mongoose'
import BookI from '../interfaces/book.interface';

const BookSchema : Schema<BookI> = new Schema({
    title:{
        type: String,
        required: [true, "Please enter title!"]
    },
    author:{
        type: String,
        required: [true, "Please enter author!"]
    },
    publicationYear: {
        type: Number,
        required: [true, "Please enter publication year!"]
    },
    genre: {
        type: [String],
        enum: ["Fantasy", "Sci-Fi", "Romance", "Horror", "Biography", "History", "Drama", "Educational"],
        required: [true, "Please enter the genres"]
    },
    price:{
        type: Number,
        min: 0,
        required: [true, "Please enter price!"]
    },
    reviewCount:{
        type: Number,
        default: 0,
    }
});
const Book = mongoose.model<BookI>("books", BookSchema);
export default Book;