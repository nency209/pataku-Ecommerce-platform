// routes/wishlistRoutes.js
import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import { Auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", Auth, getWishlist);
router.post("/:productId", Auth, addToWishlist);

router.delete("/:productId", Auth, removeFromWishlist);

export default router;
