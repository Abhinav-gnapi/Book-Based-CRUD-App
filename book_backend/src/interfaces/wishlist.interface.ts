import { Types } from "mongoose";

interface WishlistI {
    user: Types.ObjectId;
    book: Types.ObjectId;
    createdAt: Date;
}
export default WishlistI;