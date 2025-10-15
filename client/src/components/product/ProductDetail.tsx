"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types";
import api from "@/utils/api";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShieldCheck, Truck, Undo2, Heart, IndianRupee } from "lucide-react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/cartslice";
import { addToWishlist } from "@/redux/wishlistslice";
import { toast } from "react-toastify";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Default states
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.image);
      } catch (err) {
        console.error("❌ Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const productId = product._id;
    if (!productId) {
      toast.error("Invalid product id");
      return;
    }
    dispatch(addToCart({ productId, quantity }));
    setShowPopup(true);
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    const productId = product._id;
    if (!productId) {
      toast.error("Invalid product id");
      return;
    }
    try {
      await dispatch(addToWishlist(productId)).unwrap();
      toast.success("Added to wishlist!");
    } catch (err: any) {
      toast.error(err?.message || String(err) || "Failed to add to wishlist");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found</p>;

  return (
    <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0 py-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left side: images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-3">
            {selectedImage && (
              <Image src={product.image ?? "./placeholder.jpg"}
                               alt={product.name}
                width={600}
                height={600}
                className="object-contain w-full h-auto max-h-[500px]"
                quality={100}
                            />
              
            )}
          </div>
        </div>

        {/* Right side: details */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-lg sm:text-xl font-light font-lato">
            {product.name}
          </h1>

          <p className="text-black text-[13px] font-rubik font-light">
            {product.stock && product.stock > 0 ? ` In stock` : "Out of Stock"}
          </p>

          {/* Prices */}
          <div className="flex flex-wrap gap-2 items-center my-2 text-2xl sm:text-[28px] font-rubik font-light text-primary">
            {product.oldprice && (
              <span className="line-through text-gray-500 flex justify-center items-center">
                <IndianRupee />
                {product.oldprice}
              </span>
            )}
            <span className="flex justify-center items-center">
              <IndianRupee />
              {product.price}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center border border-color gap-4">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center text-sm focus:outline-none"
              />
              <div className="flex flex-col">
                <button
                  type="button"
                  className="px-1 border border-color"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <button
                  type="button"
                  className="px-1 border border-color"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <Button variant="black" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>

            <Button
              variant="black"
              size="lg"
              onClick={() => router.push("/Checkout")}
            >
              Buy it now
            </Button>
          </div>

          {/* Wishlist */}
          <Button
            variant="black"
            size="lg"
            className="flex items-center gap-2 mt-4"
            onClick={handleAddToWishlist}
          >
            <Heart className="w-4 h-4" />
            <span>Add to Wishlist</span>
          </Button>

          {/* Category */}
          <p className="mt-4 text-[13px] text-muted font-rubik font-light">
            Category: <span className="text-muted">{product.category}</span>
          </p>

          {/* Share */}
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className="text-base font-rubik font-light">Share:</span>
            <div className="flex gap-2">
              {["plus", "pinterest", "facebook", "twitter"].map((icon, i) => (
                <Link key={i} href="#">
                  <Image
                    src={`/img/${icon}.jpg`}
                    
                    alt={icon}
                    width="18"
                    height="18"
                    className="w-6 h-6"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Safe checkout icons */}
          <div className="mt-4">
            <p className="text-[13px] font-rubik font-light mb-2 text-muted">
              Guaranteed safe checkout
            </p>
            <div className="flex gap-2 flex-wrap">
              {[
                "social",
                "facebook",
                "bitcoin",
                "google-pay",
                "paypal",
                "visa",
              ].map((icon, i) => (
                <Image
                  key={i}
                  src={`/img/${icon}.jpg`}
                  alt={icon}
                  width={32}
                  height={32}
                  className="w-8 h-8 border border-gray-300 rounded-sm p-1"
                />
                
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="mt-6 space-y-2 text-[13px] font-rubik font-light text-muted">
            <div className="flex items-center gap-2 border-b border-color py-2">
              <ShieldCheck className="w-4 h-4" />
              <span>
                Security policy (edit with Customer reassurance module)
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-color py-2">
              <Truck className="w-4 h-4" />
              <span>
                Delivery policy (edit with Customer reassurance module)
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-color py-2">
              <Undo2 className="w-4 h-4" />
              <span>Return policy (edit with Customer reassurance module)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start pt-12 px-4"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative bg-white p-6 w-full max-w-lg grid gap-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              ✖
            </button>
            <div className="flex gap-4">
              <Image
                src={
                  selectedImage
                    ? `http://localhost:8000${selectedImage}`
                    : "/placeholder.png"
                }
                alt={product.name}
                width={112}
                height={112}
                className="w-28 h-28 object-contain"
              />
              <div className="space-y-2">
                <p className="text-lg font-semibold line-clamp-3">
                  {product.name}
                </p>
                <p className="text-green-600">✔️ Added to cart successfully!</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push("/cart")}
                    className="px-4 py-2 bg-black text-white"
                  >
                    View Cart
                  </button>
                  <button
                    onClick={() => router.push("/Checkout")}
                    className="px-4 py-2 bg-black text-white"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
