"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchWishlist, removeFromWishlist } from "@/redux/wishlistslice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function WishlistPage() {
  const { items, loading } = useSelector((state: RootState) => state.wishlist);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<any>();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.info("Please login to view your wishlist");
      setTimeout(() => router.push("/login"), 1000);
    } else {
      dispatch(fetchWishlist());
    }
  }, [user, dispatch, router]);

  if (!user) return null; // wait for redirect
  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (!items.length)
    return <p className="p-8 text-center">Your wishlist is empty ❤️</p>;

  return (
    <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0 my-10">
      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <Image
              src={item.image ?? "./placeholder.jpg"}
              alt={item.name}
              width={200}
              height={200}
              className="w-full h-48 object-contain"
            />
            <h2 className="mt-2 text-lg">{item.name}</h2>
            <p className="text-primary">₹{item.price}</p>
            <button
              className="mt-2 px-4 py-2 bg-black text-white rounded"
              onClick={() => dispatch(removeFromWishlist(item.productId))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
