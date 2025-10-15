"use client";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { clearCart, fetchCart } from "@/redux/cartslice";
import loadScript from "@/utils/loadscript";
import api from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { IndianRupee } from "lucide-react";

const Schema = Yup.object({
  email: Yup.string().email("Invalid").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  paymentMethod: Yup.mixed<"razorpay" | "cod">()
    .oneOf(["razorpay", "cod"])
    .required(),
});

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);

  // fetch cart data on mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const [billingSame, setBillingSame] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  // calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = cart.reduce((sum, item) => {
    if (!item.discount) return sum;
    return sum + (item.product.price * item.quantity * item.discount) / 100;
  }, 0);

  const grandTotal = subtotal - discount;

  const onSubmit = async (values: any) => {
    setIsPaying(true);
    try {
      const ok = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!ok) throw new Error("Razorpay SDK failed to load");

      const { data } = await api.post("/orders/razorpay/order", {
        amount: Math.round(grandTotal * 100),
      });

      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Pataku Demo Store",
        description: "Order Payment",
        handler: async (response: any) => {
          await api.post("/orders/create", {
            customer: values,
            items: cart,
            totals: { subtotal, discount, grandTotal },
            paymentStatus: "paid",
            razorpayPaymentId: response.razorpay_payment_id,

            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
          alert(`✅ Payment successful! ID: ${response.razorpay_payment_id}`);
          dispatch(clearCart());
        },
        prefill: {
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
        },
        theme: { color: "#8B5CF6" },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("⚠️ Payment failed, please try again.");
    }
    setIsPaying(false);
  };

  return (
    <>
      <div className="border-b border-color flex justify-center items-center">
        <h1 className="text-xl font-bold font-rubik p-4">Pataku Demo</h1>
      </div>

      <div className="w-full grid md:grid-cols-2">
        {/* Left side form */}
        <div className="bg-white border-r border-color px-8 py-6 flex justify-end">
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              address: "",
              apartment: "",
              city: "",
              state: "",
              pincode: "",
              paymentMethod: "razorpay",
              offers: false,
              saveInfo: false,
            }}
            validationSchema={Schema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-5 w-full">
                {/* Contact */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">Contact</h2>
                    <Link href="/login" className="text-sm underline">
                      Log in
                    </Link>
                  </div>
                  <Field
                    name="email"
                    placeholder="Email or mobile phone number"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <label className="flex items-center gap-2 mt-2 text-sm">
                    <Field type="checkbox" name="offers" />
                    Email me with news and offers
                  </label>
                </div>

                {/* Delivery */}
                <div>
                  <h2 className="font-semibold text-lg mb-2">Delivery</h2>
                  <select className="w-full border border-gray-300 rounded-md p-2 mb-2">
                    <option>India</option>
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <Field
                      name="firstName"
                      placeholder="First name"
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <Field
                      name="lastName"
                      placeholder="Last name"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <Field
                    name="address"
                    placeholder="Address"
                    className="w-full border border-gray-300 rounded-md p-2 mt-2"
                  />
                  <Field
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full border border-gray-300 rounded-md p-2 mt-2"
                  />
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Field
                      name="city"
                      placeholder="City"
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <Field
                      name="state"
                      placeholder="State"
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <Field
                      name="pincode"
                      placeholder="PIN code"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <label className="flex items-center gap-2 mt-2 text-sm">
                    <Field type="checkbox" name="saveInfo" />
                    Save this information for next time
                  </label>
                </div>

                {/* Payment */}
                <div>
                  <h2 className="font-semibold text-lg mb-2">Payment</h2>
                  <p className="text-xs text-gray-500 mb-2">
                    All transactions are secure and encrypted.
                  </p>

                  <label className="flex items-center justify-between border border-gray-300 rounded-md p-3 cursor-pointer">
                    <span>Pay Online (Razorpay)</span>
                    <input
                      type="radio"
                      checked={values.paymentMethod === "razorpay"}
                      onChange={() =>
                        setFieldValue("paymentMethod", "razorpay")
                      }
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isPaying}
                  className="mt-3 bg-black text-white px-4 py-3 rounded w-full font-medium disabled:opacity-50"
                >
                  {isPaying ? "Processing..." : "Complete order"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right side summary */}
        <div className="px-8 py-6 flex justify-start bg-header">
          <div className="space-y-4 px-4 w-full">
            {cart.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      item.product.image ?? "./placeholder.jpg"
                    }
                    alt={item.product?.name || "product image"}
                    width={64}
                    height={64}
                    className="w-16 h-16 border rounded-md border-color"
                  />
                  <div>
                    <p className="text-sm font-medium line-clamp-2">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="flex items-center">
                  <IndianRupee size={14} />
                  {item.product.price * item.quantity}
                </span>
              </div>
            ))}

            <hr />
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="flex items-center">
                <IndianRupee size={14} />
                {subtotal}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span className="flex items-center">
                <IndianRupee size={14} />
                {discount}
              </span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="flex items-center">
                <IndianRupee size={18} />
                {grandTotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
