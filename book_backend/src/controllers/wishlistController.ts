import { Response,Request } from "express";
import { Wishlist } from "../models/wishlistModel";

export const addWishlist = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.id;
        const bookId = req.params.id;
        if (!bookId) {
            return res.status(400).json({ message: "Book ID required" });
        }
        const existItem = await Wishlist.findOne({
            user: userId,
            book: bookId
        }).populate("book");

        if (existItem) {
            return res.status(200).json({
                message: "Already added"
            });
        }

        const wishlistItem = await Wishlist.create({
            user: userId,
            book: bookId
        });

        const populatedItem = await Wishlist.findById(wishlistItem._id)
        .populate("book");

        res.status(201).json({
            message: "Added to wishlist",
            item: populatedItem
        });
    } catch (error:any) {
        res.status(500).json({
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}

export const viewMyWishlist = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.id;

        const wishlist = await Wishlist.find({user: userId}).populate("book");
        res.status(200).json(wishlist);
    } catch (error: any) {
        res.status(500).json({
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}

export const removeFromWishlist = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.id;
        const bookId = req.params.id;
        if (!bookId) {
            return res.status(400).json({ message: "Book ID required" });
        }

        const wishlistItem = await Wishlist.findOne({
            user: userId,
            book: bookId
        });

        if (!wishlistItem) {
            return res.status(200).json({ message: "Already removed" });
        }
        const itemRemoved = await Wishlist.findOneAndDelete({
            user: userId,
            book: bookId
        }).populate("book");

        res.json({ message: "Removed from wishlist", item: itemRemoved });
    } catch(error: any) {
        res.status(500).json({
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}

export const wishlistCount = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.id;

        const count = await Wishlist.countDocuments({ user: userId });
        res.status(200).json({"No. of books in the wishlist": count})
    } catch (error: any) {
        res.status(500).json({
            statusCode: res.statusCode,
            errorMsg: error.message
        });
    }
}

