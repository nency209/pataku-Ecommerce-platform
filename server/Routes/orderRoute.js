import express from "express";
import { createOrder, createRazorpayOrder, getOrders } from "../controllers/orderController.js";



const orderRoutes = (io) => {
  const router = express.Router();

  router.post("/razorpay/order", createRazorpayOrder);
  router.post("/create", (req, res) => createOrder(req, res, io)); // pass io
  router.get("/", getOrders);

  return router;
};

export default orderRoutes;

