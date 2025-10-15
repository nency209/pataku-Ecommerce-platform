import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST() {
  try {
    // create razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,      // from .env.local
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // order options
    const options = {
      amount: 50000, // 500 INR in paise (always in paise)
      currency: "INR",
      receipt: "receipt#1",
    };

    // create order
    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
