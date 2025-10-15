"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types/Product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToWishlist } from "@/redux/wishlistslice";
import { addToCart } from "@/redux/cartslice";
import { toast } from "react-toastify";

export default function ProductCard({
  _id,
  name,
  price,
  oldprice,
  status,
  image,
  discount,
}: Product) {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const handleAddToWishlist = async () => {
    if (!user) return toast.info("Please login first");
    if (!_id) return toast.error("Invalid product id");
    try {
      await dispatch(addToWishlist(_id)).unwrap();
      toast.success("Product added to wishlist");
    } catch (err: any) {
      toast.error(err?.message || String(err) || "Failed to add to wishlist");
    }
  };

  const handleAddToCart = () => {
    if (!_id) return;
    try {
      dispatch(addToCart({ productId: _id, quantity: 1 }));
      setShowPopup(true);
    } catch (error: any) {
      toast.error(error || "Failed to add to cart");
    }
  };

  return (
    <div className="cursor-pointer border border-color">
      <div className="relative ">
        <div className="w-full bg-card flex items-center mt-3 sm:mt-4">
          {image && (
            <div className="relative w-full aspect-[401/480] group">
              <Image
                src={image}
                alt={name}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                className="object-cover bg-card"
              />

              {/* Top-right actions */}
              <div
                className="absolute top-2 right-3 sm:right-4 flex flex-col gap-2 
     opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
              >
                <button
                  className="bg-white p-2 rounded-full shadow flex items-center justify-center"
                  onClick={() => router.push(`/product/${_id}`)}
                >
                  <Eye className="w-3 h-3 text-muted text-hover cursor-pointer" />
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className="bg-white p-2 rounded-full shadow flex items-center justify-center"
                >
                  <Heart className="w-3 h-3 text-muted text-hover cursor-pointer" />
                </button>
              </div>

              {/* Cart (bottom-right) */}
              <div
                className="absolute bottom-1 right-3 sm:right-4 
     opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
              >
                <button
                  onClick={handleAddToCart}
                  className="bg-white p-2 rounded-full shadow flex items-center justify-center bg-primary-hover border primary-border cursor-pointer"
                >
                  <ShoppingCart className="w-3 h-3 text-muted hover:text-white cursor-pointer" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cart popup */}
        {showPopup && (
          <div
            className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start pt-12 "
            onClick={() => setShowPopup(false)} // click backdrop to close
          >
            <div
              className="relative bg-white p-6 grid xl:grid-cols-3 gap-6 shadow-lg"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside card
            >
              {/* Close Button (top-right corner) */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              >
                ✖
              </button>

              <div>
                <Image
                  src={image ?? "./placeholder.jpg"}
                  alt={name}
                  width={112}
                  height={112}
                  className="w-28 h-28 object-contain"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <p className="text-lg font-semibold max-w-md line-clamp-1 cursor-pointer">
                  {name}
                </p>
                <p className="text-green-600">✔️ Added to cart successfully!</p>
                <button
                  onClick={() => router.push("/cart")}
                  className="px-4 py-2 bg-black text-white cursor-pointer"
                >
                  View Cart
                </button>
                <button
                  onClick={() => router.push("/Checkout")}
                  className="px-4 py-2 bg-black text-white ml-2 cursor-pointer"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-2 left-4 bg-black text-white px-1 font-rubik font-light text-xs">
          <div>{status}</div>
        </div>

        {discount && (
          <div className="absolute top-6 left-4 bg-primary px-1 text-white font-rubik font-light text-[11px]">
            {discount}%
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3
          className="text-base font-light font-rubik text-black text-hover line-clamp-2"
          title={name}
        >
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-base font-light font-rubik text-primary">
            ₹{price}
          </span>
          {oldprice && (
            <span className="text-sm font-light font-rubik text-muted line-through">
              ₹{oldprice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
