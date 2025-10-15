import Order from "../model/Order.js";
import Product from "../model/Product.js";
import Cart from "../model/Cart.js";

import Razorpay from "razorpay";
import dotenv from "dotenv";
import redisClient from "../config/redis.js";
import crypto from "crypto";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const verifyRazorpayPayment = (order_id, payment_id, signature) => {
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(order_id + "|" + payment_id)
    .digest("hex");

  return generated_signature === signature;
};

// Create Razorpay order
export const createRazorpayOrder = async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await razorpay.orders.create({ amount, currency: "INR" });
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Razorpay order creation failed" });
  }
};

export const createOrder = async (req, res) => {
  const {
    customer,
    items,
    shipping,
    totals,
    paymentStatus,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;
  const userId = req.userId;

  if (!customer || !items?.length || !totals || !razorpayOrderId) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  if (
    !verifyRazorpayPayment(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    )
  ) {
    return res.status(400).json({ error: "Payment verification failed" });
  }

  try {
    const newOrder = await Order.create({
      customer,
      items,
      shipping,
      totals,
      paymentStatus,
      razorpayPaymentId,
    });

    res.status(201).json(newOrder);

    const bulkStockUpdates = items.map((item) => ({
      updateOne: {
        filter: { _id: item.product?._id || item.productId },
        update: { $inc: { stock: -item.quantity } },
      },
    }));

    const redisKeysToDel = ["products:all"];
    items.forEach((item) =>
      redisKeysToDel.push(`product:${item.product?._id || item.productId}`)
    );

    await Promise.all([
      Product.bulkWrite(bulkStockUpdates),
      Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } }),
      redisClient.del(redisKeysToDel),
      redisClient.del(`cart:${userId}`),
    ]);

    console.log(`✅ Post-order tasks completed for order ${newOrder._id}`);
  } catch (err) {
    console.error("❌ createOrder failed:", err);
  }
};

export const getOrders = async (req, res,io) => {
  try {
    const orders = await Order.find()
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
