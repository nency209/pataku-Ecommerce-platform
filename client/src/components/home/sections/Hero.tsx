"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { slides } from "@/constants/Hero";
import { Button } from "../../ui/button";
import Link from "next/link";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [lastAction, setLastAction] = useState<"next" | "prev" | null>(null);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    setLastAction("next");
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setLastAction("prev");
  };

  return (
    <section className="bg-hero py-6 ">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[360px] lg:h-[520px] overflow-hidden group">
          {/* Background Image */}
          <Image
            src={slides[index].image}
            alt={slides[index].title}
            fill
            className="object-cover sm:object-contain"
            sizes="100vw"
            priority
          />

          {/* AnimatePresence for fade animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center py-6 sm:py-10 md:py-16">
                <div className="max-w-[85%] sm:max-w-md sm:ml-8 md:ml-12 lg:ml-16 xl:px-4 px-2">
                  <p className="text-muted font-rubik font-light text-lg sm:text-xl md:text-[20px]">
                    {slides[index].subtitle}
                  </p>
                  <p className="text-primary text-[40px] sm:text-[60px] md:text-[60px] font-lato font-light leading-none">
                    {slides[index].title}
                  </p>
                  <p className="text-primary text-[28px] sm:text-[36px] md:text-[50px] font-rubik font-light leading-none">
                    {slides[index].title2}
                  </p>
                  <Button
                    asChild
                    variant="black"
                    size="lg"
                    className="text-xs sm:text-sm font-normal mt-2 sm:mt-4"
                  >
                    <Link href={slides[index].buttonLink}>
                      {slides[index].buttonText}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots inside image */}
          <div className="absolute xl:bottom-8  lg:bottom-16 md:bottom-14 bottom-1 left-1/2 -translate-x-1/2 flex space-x-2">
            <button
              onClick={prevSlide}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-hero ${
                lastAction === "prev" || index === 0
                  ? "border-2 primary-border"
                  : "border-none"
              }`}
            />
            <button
              onClick={nextSlide}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-hero ${
                lastAction === "next"
                  ? "border-2 primary-border"
                  : "border-none"
              }`}
            />
          </div>

          {/* Prev / Next Arrows */}
          <Button
            onClick={prevSlide}
            variant="outline"
            className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 opacity-0 -translate-x-5 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width="18"
              height="18"
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
            onClick={nextSlide}
            variant="outline"
            className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 opacity-0 translate-x-5 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width="18"
              height="18"
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
