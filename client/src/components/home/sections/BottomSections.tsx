"use client";
import ProductCard from "@/components/product/ProductCard";
import Image from "next/image";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { Product } from "@/types/Product";

export default function BottomSections() {
  const [index, setIndex] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const itemsPerPage = 2;
  const popularitemsPerPage = 6; // 2 columns × 3 rows
  const totalColumns = Math.ceil(products.length / 3); // since 3 rows per column

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

  const nextSlide = () => {
    if (index < products.length - itemsPerPage) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const popularnextSlide = () => {
    if (currentColumn < totalColumns - 2) {
      setCurrentColumn((prev) => prev + 1);
    }
  };

  const popularprevSlide = () => {
    if (currentColumn > 0) {
      setCurrentColumn((prev) => prev - 1);
    }
  };

  return (
    <section className=" py-8">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deals of The Week */}
          <div className="relative">
            <div className="mb-4 md:mb-8">
              <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold font-lato text-black mb-2">
                Deals
                <span className="italic text-2xl sm:text-[28px] lg:text-[32px] font-light font-lato text-black">
                  of The
                </span>
                Week
              </h2>
              <p className="text-sm sm:text-base text-muted font-rubik font-light">
                Deals of the Week are a selection of flash deals updated every
                week!
              </p>
            </div>

            {/* Products grid */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-6 md:gap-6 sm:gap-6 "
                animate={{ x: `-${index * (100 / itemsPerPage)}%` }}
                transition={{ type: "tween", duration: 0.5 }}
              >
                {products.map((product, i) => (
                  <div
                    key={i}
                    className="w-48 sm:w-28 md:w-72 lg:w-48  xl:w-64 flex-shrink-0 "
                  >
                    <div key={i} className="p-2">
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
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <Button
              onClick={prevSlide}
              disabled={index === 0}
              variant="outline"
              className="absolute left-2 sm:-left-4 bottom-24 sm:bottom-40 -translate-y-1/2 disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="sm:w-6 sm:h-6 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>

            <Button
              onClick={nextSlide}
              disabled={index === products.length - 1}
              variant="outline"
              className="absolute right-2 sm:right-4 bottom-24 sm:bottom-40 -translate-y-1/2 disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="sm:w-6 sm:h-6 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          </div>

          {/* Popular Products */}
          <div className="relative">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold font-lato text-black mb-2">
                Some
                <span className="italic text-2xl sm:text-[28px] lg:text-[32px] font-light font-lato text-black">
                  Popular
                </span>
                Products
              </h2>
              <p className="text-sm sm:text-base text-muted font-rubik font-light">
                We offer the best selection furniture at prices you will love!
              </p>
            </div>

            <div className="overflow-hidden">
              <motion.div
                className="flex gap-x-2 sm:gap-x-4"
                animate={{ x: `-${currentColumn * 50}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {Array.from({ length: totalColumns }).map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className="grid grid-cols-1 grid-rows-3 gap-y-6 sm:gap-y-8 w-[85%] sm:w-1/2 flex-shrink-0"
                  >
                    {products
                      .slice(colIndex * 3, colIndex * 3 + 3)
                      .map((product, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 sm:gap-4  w-28 h-28"
                        >
                          <div className="w-24 h-28 sm:w-24 sm:h-28 flex-shrink-0 ">
                            <Image
                              src={product.image ?? "/placeholder.png"}
                              alt={product.name}
                              width={90}
                              height={90}
                              className="object-cover"
                            />
                            
                          </div>
                          <div className="flex flex-col gap-1 px-1">
                            <h3
                              className="text-sm sm:text-base font-light text-black font-rubik line-clamp-2 cursor-pointer"
                              title={product.name}
                            >
                              {product.name}
                            </h3>
                            <span className="text-sm sm:text-base font-light text-muted font-rubik">
                              {product.oldprice && (
                                <span className="text-xs sm:text-sm font-light text-muted font-rubik px-1 sm:px-2 line-through">
                                  ₹{product.oldprice}
                                </span>
                              )}
                              ₹{product.price}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <Button
              onClick={popularprevSlide}
              disabled={currentColumn === 0}
              variant="outline"
              className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="sm:w-6 sm:h-6 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>

            <Button
              onClick={popularnextSlide}
              disabled={currentColumn >= totalColumns - 2}
              variant="outline"
              className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="sm:w-6 sm:h-6 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
