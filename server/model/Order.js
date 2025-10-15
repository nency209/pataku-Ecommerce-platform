// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  shipping: {
    method: { type: String, default: "standard" },
    cost: { type: Number, default: 0 },
  },
  totals: {
    subtotal: { type: Number, required: true },
   
    discount: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
  },
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  razorpayPaymentId: String,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
