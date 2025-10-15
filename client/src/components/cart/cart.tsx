"use client";
import {
  fetchCart,
  updateQuantity,
  clearCart,
  removeFromCart,
} from "@/redux/cartslice";
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

export default function CartPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const { items } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ✅ Fetch cart on mount
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.info("Please login to view your cart");
      setTimeout(() => router.push("/login"), 1000);
    }
  }, [user, router]);

  const safeItems = Array.isArray(items) ? items : [];


  const total = safeItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (!user)
    return <p className="text-center py-10">Redirecting to login...</p>;
  if (safeItems.length === 0)
    return <p className="text-center py-10">Your cart is empty.</p>;

  // ✅ Handle quantity change (update DB immediately)
  const handleQuantityChange = (productId: string, value: number) => {
    const qty = value < 1 ? 1 : value;
    dispatch(updateQuantity({ productId, quantity: qty }))
      .unwrap()
      .then(() => {
        toast.success("Quantity updated!");
      })
      .catch(() => {
        toast.error("Failed to update quantity");
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>

      <table className="w-full border border-color">
        <thead>
          <tr className="border text-muted font-rubik">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Remove</th>
          </tr>
        </thead>
        <tbody>
          {safeItems.map((item) => (
            <tr key={item._id} className="border text-center">
              <td className="p-2 border">
                <Image
                  src={item.product.image ?? "./placeholder.jpg"}
                  alt={item.product.name}
                  width={28}
                  height={28}
                  className="relative mx-auto"
                />
              </td>
              <td className="p-2 border text-left">
                <p className="font-medium">{item.product.name}</p>
              </td>
              <td className="p-2 border"> ₹{item.product.price}</td>
              <td className="p-2 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity - 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={item.quantity <= 1} // prevent going below 1
                >
                  –
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </td>

              <td className="p-2 border">
                ₹{item.product.price * item.quantity}
              </td>
              <td className="p-2 border">
                <Button
                  variant="black"
                  size="lg"
                  onClick={() =>
                    dispatch(removeFromCart({ productId: item.product._id }))
                  }
                  className="text-red-500 cursor-pointer"
                >
                  ❌
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Actions */}
      <div className="flex gap-4 mt-4">
        <Link href="/" className="bg-black text-white px-4 py-2 cursor-pointer">
          Continue Shopping
        </Link>
        <Button variant="black" size="lg"  className="cursor-pointer" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </div>

      {/* Totals */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-10">
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Cart Totals</h2>
          <table className="w-full border">
            <tbody>
              <tr>
                <td className="p-2 border">Subtotal</td>
                <td className="p-2 border"> ₹{total}</td>
              </tr>
              <tr>
                <td className="p-2 border">Total</td>
                <td className="p-2 border"> ₹{total}</td>
              </tr>
            </tbody>
          </table>
          <Button
            variant="black"
            size="lg"
            onClick={() => router.push("/Checkout")}
            className="mt-4 cursor-pointer"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
