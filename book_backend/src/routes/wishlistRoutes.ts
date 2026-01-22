import express from "express";
const router = express.Router()

import {
    addWishlist,
    viewMyWishlist,
    removeFromWishlist,
    wishlistCount
} from "../controllers/wishlistController"

router.post("/wishlist/add/:id", addWishlist)
router.get("/wishlist", viewMyWishlist)
router.delete("/wishlist/remove/:id", removeFromWishlist)
router.get("/wishlist/count", wishlistCount)

export default router;