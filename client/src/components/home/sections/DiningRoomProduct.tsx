"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import api from "@/utils/api";
import { toast } from "react-toastify";

export default function DiningRoomProduct() {
  const tabs = ["Featured Product", "Chair", "Sofa"];
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);
  const [products, setproducts] = useState<Product[]>([]);

  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const res = await api.get("/products");
        setproducts(res.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    fetchproducts();
  }, []);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1280) setItemsPerView(3); // xl and up → 3 cols
      else if (window.innerWidth >= 768) setItemsPerView(2); // md-lg → 2 cols
      else setItemsPerView(1); // mobile → 1 col
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const itemsPerPage = itemsPerView * 2; // since 2 rows
  const maxIndex = Math.max(0, Math.ceil(products.length / 2) - itemsPerView);

  const handleNext = () => {
    setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };
  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <section className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0 my-16 group">
      {/* Title and Tabs */}
      <div className="flex justify-between items-center pb-2 mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold font-lato">
          Dining{" "}
          <span className="italic font-light font-rubik text-2xl">Room</span>
        </h2>
        <div className="flex-1 border-t border-color mx-4 hidden sm:block"></div>
        <div className="flex gap-2 text-sm">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`pb-1 px-2 hover:text-primary transition-colors duration-200 ${
                idx === active
                  ? "border-2 border-primary text-primary"
                  : "text-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Products + Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {/* Products Grid */}
        <div className="lg:col-span-2 md:col-span-2 xl:col-span-3 relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex "
              animate={{ x: `-${index * (100 / itemsPerView)}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              {Array.from({ length: Math.ceil(products.length / 2) }).map(
                (_, colIdx) => (
                  <div
                    key={colIdx}
                    className="grid grid-rows-2 gap-8 min-w-full sm:min-w-1/2 xl:min-w-1/3"
                  >
                    {products
                      .slice(colIdx * 2, colIdx * 2 + 2)
                      .map((product, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 sm:gap-4  w-28 h-28"
                        >
                          <div className="w-24 h-28 sm:w-24 sm:h-28 flex-shrink-0 ">
                            <Image
                              src={product.image ?? "./placeholder.jpg"}
                              alt={product.name}
                              width={90}
                              height={90}
                              className="object-cover"
                            />
                          </div>
                          <div className="mt-1 flex flex-col">
                            <p className="mt-2 text-base font-light font-rubik text-black text-hover cursor-pointer line-clamp-2">
                              {product.name}
                            </p>
                            <div>
                              {product.oldprice && (
                                <span className="text-sm font-light font-rubik text-muted line-through mr-2">
                                  ₹{product.oldprice}
                                </span>
                              )}
                              <span className="text-base font-light font-rubik text-primary">
                                ₹{product.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* Prev/Next Buttons */}
          <Button
            onClick={handlePrev}
            disabled={index === 0}
            variant="outline"
            size="sm"
            className="absolute -left-6 top-1/2 -translate-y-1/2 "
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
              {" "}
              <path d="m15 18-6-6 6-6" />{" "}
            </svg>
          </Button>
          <Button
            onClick={handleNext}
            disabled={index === maxIndex}
            variant="outline"
            size="sm"
            className="absolute xl:-right-10 top-1/2 -translate-y-1/2 z-10 -right-6 "
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
              {" "}
              <path d="M9 18l6-6-6-6" />{" "}
            </svg>
          </Button>
        </div>

        {/* Right Side Banner */}
        <div className="relative col-span-1 w-full h-[250px] md:h-[200px]">
          <Image
            src="/img/home2-banner8.jpg"
            alt="Dining Offer"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
