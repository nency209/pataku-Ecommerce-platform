"use client";
import ProductCard from "@/components/product/ProductCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Product } from "@/types/Product";
import api from "@/utils/api";
import { toast } from "react-toastify";

export default function NewArrivals() {
  const [index, setIndex] = useState(0);
  const [visibleCols, setVisibleCols] = useState(5);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const columns = Math.ceil(products.length / 2);

  // Responsive visibleCols based on screen size
  useEffect(() => {
    const updateVisibleCols = () => {
      if (window.innerWidth < 640) {
        setVisibleCols(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCols(3); // Tablet
      } else {
        setVisibleCols(5); // Desktop
      }
    };

    updateVisibleCols();
    window.addEventListener("resize", updateVisibleCols);
    return () => window.removeEventListener("resize", updateVisibleCols);
  }, []);

  const handleNext = () => {
    if (index < columns - visibleCols) {
      setIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="py-8  bg-white relative">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[28px] md:text-[32px] font-bold font-lato text-black mb-2">
            New
            <span className="italic font-light font-lato text-black">
              Collections
            </span>
            Of Arrivals
          </h2>
          <p className="text-muted font-rubik font-light text-sm md:text-base">
            Browse the collection of our new products. You will definitely find
            what you are looking for.
          </p>
        </div>

        {/* Products Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${index * (100 / visibleCols)}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              {Array.from({ length: columns }).map((_, colIdx) => (
                <div
                  key={colIdx}
                  className="grid grid-rows-2 min-w-[100%] sm:min-w-[33.33%] xl:min-w-[20%] lg:min-w-[25%] "
                >
                  {products
                    .slice(colIdx * 2, colIdx * 2 + 2) // 2 per column
                    .map((product, idx) => (
                      <div key={idx} className="p-2">
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
              ))}
            </motion.div>
          </div>

          {/* Prev Button */}
          <Button
            onClick={handlePrev}
            disabled={index === 0}
            variant="outline"
            className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
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
            disabled={index >= columns - visibleCols}
            variant="outline"
            className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
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
