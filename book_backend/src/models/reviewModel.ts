import mongoose, {Document, model, Schema, Types} from "mongoose";
import Book from "./bookModel";

export interface ReviewI {
    book: Types.ObjectId;
    user: Types.ObjectId;
    rating:number;
    comment:string;
    createdAt: Date;
    updateAt:Date;
}

const reviewSchema = new Schema<ReviewI>({
    book:{
        type: Schema.Types.ObjectId,
        ref: "books",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
},
{timestamps: true});

reviewSchema.index({book: 1, user: 1}, {unique: true});
export const Review = model<ReviewI>("review", reviewSchema);