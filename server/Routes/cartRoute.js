import express from "express";
import {Auth } from "../middleware/auth.js";
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartController.js";

const router = express.Router();

router.post("/", Auth, addToCart);
router.get("/", Auth, getCart);
router.delete("/:productId", Auth, removeFromCart);
router.put("/:productId", Auth, updateQuantity);



export default router;
