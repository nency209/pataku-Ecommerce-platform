import express from 'express';
import { Auth } from '../middleware/auth.js';
import upload from "../config/multer.js";
import { createProduct, getAllProducts,updateProduct,deleteProduct, getProduct } from '../controllers/productController.js';

export default function productRoutes(io) {
  const route = express.Router();

  // Wrap controller to pass io
  route.post(
    '/',
    Auth,
    
    upload.single("image"),
    (req, res) => createProduct(req, res, io)
  );

  route.get('/', getAllProducts);
  
  route.get('/:id',getProduct);

   route.put("/:id", Auth, upload.single("image"), updateProduct);
  route.delete("/:id", Auth,  deleteProduct);

  return route;
}
