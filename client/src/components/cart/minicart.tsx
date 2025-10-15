"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeFromCart } from "@/redux/cartslice";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";

export default function MiniCart({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="absolute top-12 right-0 bg-white shadow-lg w-[320px] p-4 rounded-lg z-80">
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item._id || item.name}
                className="flex justify-between items-center"
              >
                <Image
                 src={item.product.image ?? "./placeholder.jpg"}
                  alt={item.product.name || "Product"}
                  width={50}
                  height={50}
                  className="rounded"
                />
                <div className="flex-1 px-2">
                  <p className="text-sm">{item.product.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × {item.product.price}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() =>
                    dispatch(removeFromCart({ productId: item.id }))
                  }
                  className="text-red-500 text-sm"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-2 flex justify-between">
            <span className="font-semibold">Subtotal</span>
            <span className="font-bold"> ₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              href="/Checkout"
              className="flex-1 text-center py-2 border rounded hover:bg-gray-100"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              className="flex-1 text-center py-2 border rounded hover:bg-gray-100"
            >
              View Cart
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
