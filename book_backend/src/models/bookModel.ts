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