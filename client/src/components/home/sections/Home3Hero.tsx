"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../../ui/button";
import Link from "next/link";
import { slides2 } from "@/constants/Hero";

export default function Home3Hero() {
  const [index, setIndex] = useState(0);
  const [lastAction, setLastAction] = useState<"next" | "prev" | null>(null);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides2.length);
    setLastAction("next");
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides2.length) % slides2.length);
    setLastAction("prev");
  };

  return (
    <section className="w-full">
      <div className="relative overflow-hidden group">
        <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[600px]">
          {/* Background Image */}
          <Image
            src={slides2[index].image}
            alt={slides2[index].title}
            fill
            className="object-cover"
            priority
          />

          {/* Animated Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
              className="absolute xl:top-32 xl:left-64  md:top-16 md:left-16 top-8 left-8"
            >
              {/* Text Content */}
              <div className="text-center sm:text-left px-4 sm:px-8 md:px-16 xl:max-w-xl max-w-lg ">
                <p className="text-primary text-xs sm:text-sm md:text-base font-rubik font-light uppercase">
                  {slides2[index].title}
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-rubik my-3 sm:my-4 text-black">
                  {slides2[index].subtitle}
                </h2>
                <Button
                  asChild
                  variant="black"
                  size="lg"
                  className="text-xs sm:text-sm font-normal mt-2"
                >
                  <Link href={slides2[index].buttonLink}>
                    {slides2[index].buttonText}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute xl:bottom-8  lg:bottom-16 md:bottom-14 bottom-1 left-1/2 -translate-x-1/2 flex space-x-2">
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
          {/* Prev/Next Buttons */}
          {/* <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full border border-color 
                       flex md:opacity-0 md:-translate-x-5 md:transition-all md:duration-500 
                       md:group-hover:opacity-100 md:group-hover:translate-x-0"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full border border-color
                       flex md:opacity-0 md:translate-x-5 md:transition-all md:duration-500 
                       md:group-hover:opacity-100 md:group-hover:translate-x-0"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
          </button> */}
        </div>
      </div>
    </section>
  );
}
