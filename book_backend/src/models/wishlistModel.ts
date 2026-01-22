import {Schema, model} from "mongoose"
import WishlistI from "../interfaces/wishlist.interface"

const WishlistSchema = new Schema<WishlistI>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
        index: true
    },
    book: {
        type:Schema.Types.ObjectId,
        ref: "books",
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
WishlistSchema.index({user: 1, book: 1}, {unique: true});

export const Wishlist = model<WishlistI>("wishlist", WishlistSchema);