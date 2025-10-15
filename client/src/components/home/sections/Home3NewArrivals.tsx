"use client";
import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/Product";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BrowseCategories from "./BrowserCategories";
import { Button } from "../../ui/button";

export default function Home3NewArrival() {
  const [index, setIndex] = useState(0);
  const [visibleCols, setVisibleCols] = useState(4);
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
  }, []); // default desktop

  // Each column will have 2 products stacked
  const columns = Math.ceil(products.length / 2);

  // Responsive visibleCols
  useEffect(() => {
    const updateVisibleCols = () => {
      if (window.innerWidth < 640) {
        setVisibleCols(1); // mobile → 1 col (2 products)
      } else if (window.innerWidth < 1024) {
        setVisibleCols(2); // tablet → 2 cols (4 products)
      } else {
        setVisibleCols(4); // desktop → 4 cols (8 products)
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
    <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0 py-6">
      {/* Banner Row */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-8">
        <Image
          src="/img/home3-banner1.jpg"
          alt=""
          width={380}
          height={230}
          className="w-full object-cover border"
        />
        <Image
          src="/img/home3-banner2.jpg"
          alt=""
          width={380}
          height={230}
          className="w-full object-cover border"
        />
        <Image
          src="/img/home3-banner3.jpg"
          alt=""
          width={380}
          height={230}
          className="w-full object-cover border"
        />
      </div>

      {/* Sidebar + Products */}
      <div className="grid lg:grid-cols-[1fr_3.2fr] grid-cols-1 gap-4">
        {/* Sidebar */}
        <div className="p-2 flex flex-col justify-between">
          <BrowseCategories />
          <div className="mt-2 lg:block hidden">
            <Image
              src="/img/home3-banner8.jpg"
              alt=""
              width={255}
              height={255}
              className="w-full object-cover border"
            />
          </div>
        </div>

        {/* Products */}
        <section className="overflow-hidden relative">
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-center">
            <h2 className="text-2xl text-black font-lato font-bold">
              New <span className="italic font-light">Collections </span>Of
              Arrivals
            </h2>
            <div className="flex-1 border-t border-color mx-4 hidden sm:block"></div>
            <div className="flex gap-2">
              <Button
                disabled={index === 0}
                className="w-6 h-6 border flex items-center justify-center border-color text-muted disabled:opacity-40"
                onClick={handlePrev}
                variant="outline"
                size="sm"
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
              <Button
                onClick={handleNext}
                disabled={index >= columns - visibleCols}
                variant="outline"
                size="sm"
                className="w-6 h-6 border flex items-center justify-center  "
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

          <p className="text-muted text-base font-lato mt-2 mb-4">
            Browse the collection of our new products. You will definitely find
            what you are looking for.
          </p>

          {/* Animated Slider */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${index * (100 / visibleCols)}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              {Array.from({ length: columns }).map((_, colIdx) => (
                <div
                  key={colIdx}
                  className="
                    grid grid-rows-2 
                    min-w-[100%] 
                    sm:min-w-[50%] 
                    md:min-w-[33.33%] 
                    lg:min-w-[25%]
                  "
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
        </section>
      </div>
    </div>
  );
}
