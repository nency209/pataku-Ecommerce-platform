"use client";
import { useEffect, useState } from "react";
import ProductCard from "../../product/ProductCard";
import { Product } from "@/types/Product";
import { Button } from "../../ui/button";
import api from "@/utils/api";
import { toast } from "react-toastify";

export default function TopSellingProducts() {
  const [product, setproduct] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setproduct(res.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleNext = () => {
    if (startIndex < product.length - visibleCount) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <section className="py-8 md:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[32px] font-bold font-lato text-black mb-2">
            Top
            <span className="italic text-[32px] font-light font-lato text-black">
              Selling
            </span>
            Products
          </h2>
          <p className="text-muted font-rubik font-light text-base">
            Browse the collection of our top selling. You will definitely find
            what you are looking for.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
              }}
            >
              {product.map((product, index) => (
                <div
                  key={index}
                  className="w-1/2 sm:w-1/3 md:w-1/4 flex-shrink-0 px-2"
                >
                  <ProductCard
                    _id={product._id}
                    name={product.name}
                    price={product.price}
                    status={product.status}
                    image={product.image}
                    oldprice={product.oldprice}
                    discount={product.discount}
                    category={product.category}
                    stock={product.stock}
                    created={product.created}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Prev Button */}
          <Button
            onClick={handlePrev}
            disabled={startIndex === 0}
            variant="outline"
            className="absolute -left-4  top-1/2 -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={startIndex >= product.length - visibleCount}
            variant="outline"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
