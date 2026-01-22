import { Types } from "mongoose";

interface ReviewI {
    book: Types.ObjectId;
    user: Types.ObjectId;
    rating:number;
    comment:string;
    createdAt: Date;
    updateAt:Date;
}
export default ReviewI
