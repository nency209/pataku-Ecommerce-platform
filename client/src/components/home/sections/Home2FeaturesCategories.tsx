"use client";
import Image from "next/image";
import { featuredCategories } from "@/constants/featuredCategories";
import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";

export default function Home2FeaturedCategories() {
  const products = featuredCategories;

  // each column has 2 items stacked
  const columns = Math.ceil(products.length / 2);

  const [index, setIndex] = useState(0);
  const [visibleCols, setVisibleCols] = useState(3); // default desktop (3 cols × 2 rows)

  // responsive column count
  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 640) {
        setVisibleCols(1); // mobile → 1 col (2 items)
      } else if (window.innerWidth < 1024) {
        setVisibleCols(2); // tablet → 2 cols (4 items)
      } else {
        setVisibleCols(3); // desktop → 3 cols (6 items)
      }
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
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
    <section className="py-6">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        {/* header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center">
            <h2 className="text-2xl text-black font-lato font-bold">
              Featured <span className="italic font-light">Categories</span>
            </h2>
            <div className="flex-1 border-t border-color mx-4"></div>
            <div className="flex gap-2">
              <Button
                onClick={handlePrev}
                variant="outline"
                size="sm"
                className="w-6 h-6 border flex items-center justify-center"
                disabled={index === 0}
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
                variant="outline"
                size="sm"
                className="w-6 h-6 border flex items-center justify-center"
                disabled={index >= columns - visibleCols}
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
        </div>

        {/* animated slider */}
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
                  grid grid-rows-2 gap-6
                  min-w-[100%] 
                  sm:min-w-[50%] 
                  lg:min-w-[33.33%]
                  px-2
                "
              >
                {products
                  .slice(colIdx * 2, colIdx * 2 + 2) // 2 per column
                  .map((product, idx) => (
                    <div key={idx} className="flex gap-2">
                      <div className="relative w-[160px] h-[160px]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain border"
                        />
                      </div>
                      <div className="flex flex-col justify-start">
                        <p className="text-sm font-rubik font-light text-[#c8c8c8]">
                          MENU TITLE
                        </p>
                        {Array.isArray(product.description) ? (
                          product.description.map((item, i) => (
                            <p
                              key={i}
                              className="mt-2 text-sm font-rubik font-light text-muted"
                            >
                              {item}
                            </p>
                          ))
                        ) : (
                          <p className="text-sm">{product.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
