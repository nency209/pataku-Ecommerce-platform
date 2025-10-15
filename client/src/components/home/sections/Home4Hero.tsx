"use client";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../../ui/button";
import Link from "next/link";
import { slides3 } from "@/constants/Hero";

export default function Home4Hero() {
  const [index, setIndex] = useState(0);
  const [lastAction, setLastAction] = useState<"next" | "prev" | null>(null);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides3.length);
    setLastAction("next");
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides3.length) % slides3.length);
    setLastAction("prev");
  };

  return (
    <section className="">
      {/* Center - Hero Banner */}
      <div className=" relative overflow-hidden group">
        <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[600px]">
          <Image
            src={slides3[index].image}
            alt={slides3[index].title}
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
              {/* Text Content */}
              <div className="absolute left-1/2 -translate-x-3/4 inset-0 flex flex-col justify-center items-start px-8 md:px-20 text-white">
                <p className="text-primary text-lg font-rubik font-light uppercase">
                  {slides3[index].title}
                </p>
                <h2 className="text-[44px] font-light text-black font-rubik my-4 max-w-xl">
                  {slides3[index].subtitle}
                </h2>
                <Button
                  asChild
                  variant="black"
                  size="lg"
                  className="text-sm font-normal mt-2"
                >
                  <Link href={slides3[index].buttonLink}>
                    {slides3[index].buttonText}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

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

      {/* Right Side - Promo Blocks */}
    </section>
  );
}
