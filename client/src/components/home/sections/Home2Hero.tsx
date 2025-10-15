"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ServiceGuarantees from "@/components/home/sections/ServiceGuarantees";
import { slides1 } from "@/constants/Hero";
import { Button } from "../../ui/button";
import Link from "next/link";
import BrowseCategories from "./BrowserCategories";

export default function Home2Hero() {
  const [index, setIndex] = useState(0);
  const [lastAction, setLastAction] = useState<"next" | "prev" | null>(null);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides1.length);
    setLastAction("next");
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides1.length) % slides1.length);
    setLastAction("prev");
  };

  return (
    <section className="bg-hero py-6">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        <div
          className="
            grid grid-cols-1
            lg:grid-cols-[0.5fr_1.5fr_1fr]
            xl:grid-cols-4
            bg-white gap-4 p-4 
          "
        >
          {/* 1️⃣ Left Sidebar - Categories */}
          <div className="relative order-1">
            <BrowseCategories />
          </div>

          {/* 2️⃣ Center - Hero Banner */}
          <div className="xl:col-span-2 relative col-span-1 group order-2">
            <div className="relative w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
              <Image
                src={slides1[index].image}
                alt={slides1[index].title}
                fill
                className="object-cover"
                priority
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-md xl:px-6 px-2">
                      <p className="text-muted font-rubik font-light text-lg sm:text-xl md:text-2xl">
                        {slides1[index].subtitle}
                      </p>
                      <p className="text-primary text-4xl sm:text-5xl md:text-6xl font-lato font-light leading-none">
                        {slides1[index].title}
                      </p>
                      <p className="text-primary text-2xl sm:text-3xl md:text-4xl font-rubik font-light leading-none">
                        {slides1[index].title2}
                      </p>

                      <Button
                        asChild
                        variant="black"
                        size="lg"
                        className="text-sm font-normal mt-2"
                      >
                        <Link href={slides1[index].buttonLink}>
                          {slides1[index].buttonText}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                <button
                  onClick={prevSlide}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white ${
                    lastAction === "prev" || index === 0
                      ? "border-2 primary-border"
                      : "border-none"
                  }`}
                />
                <button
                  onClick={nextSlide}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white ${
                    lastAction === "next"
                      ? "border-2 primary-border"
                      : "border-none"
                  }`}
                />
              </div>

              {/* Prev/Next Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 border border-color
                 opacity-0 -translate-x-5 transition-all duration-500 
                 group-hover:opacity-100 group-hover:translate-x-0"
              >
                <ChevronLeft className="w-4 h-4 text-muted" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 border border-color
                 opacity-0 translate-x-5 transition-all duration-500
                 group-hover:opacity-100 group-hover:translate-x-0"
              >
                <ChevronRight className="w-4 h-4 text-muted" />
              </button>
            </div>
          </div>

          {/* 3️⃣ Right Side - Promo Blocks (3 stacked) */}
          <div className="xl:col-span-1 grid lg:grid-cols-1 md:grid-cols-2 gap-4 order-3">
            <div className="relative overflow-hidden w-full h-[150px] sm:h-[180px] lg:h-[200px] xl:h-[200px]">
              <Image
                src="/img/home2-banner1.jpg"
                alt="Storage & Shelving"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative overflow-hidden w-full h-[150px] sm:h-[180px] lg:h-[200px] xl:h-[200px]">
              <Image
                src="/img/home2-banner2.jpg"
                alt="Up to 25% Off"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Service Section */}
        <ServiceGuarantees />
      </div>
    </section>
  );
}
