"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/api"; // your axios instance with interceptors

export default function NavigationIndex() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const [productName, setProductName] = useState<string | null>(null);

  useEffect(() => {
    // Check if path is /product/[id]
    if (segments[0] === "product" && segments[1]) {
      const productId = segments[1]; // second part of URL
      api
        .get(`/products/${productId}`) // your backend route
        .then((res) => {
          setProductName(res.data.name); // adjust based on your API response
        })
        .catch(() => setProductName(null));
    }
  }, [segments]);

  return (
    <div className="w-full relative h-[140px] sm:h-[180px] md:h-[215px]">
      {/* Background Banner */}
      <Image
        src="/img/breadcrumb-bg.jpg"
        alt="breadcrumb banner"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-6xl mx-auto">
          <ol className="flex flex-wrap items-center text-xs sm:text-sm  max-w-xl md:text-base text-muted font-light font-rubik ">
            <li>
              <Link href="/" className="hover:text-black">
                Home
              </Link>
            </li>

            {segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/");

              // If it's the product ID segment, replace with name
              let label = segment.charAt(0).toUpperCase() + segment.slice(1);
              if (segments[0] === "product" && index === 1) {
                label = productName || "Loading...";
              }

              return (
                <li key={href} className="flex items-center ml-1 sm:ml-2 ">
                  <span className="mx-1 sm:mx-2">/</span>
                  <Link
                    href={href}
                    className="text-black text-xs sm:text-sm md:text-base font-light font-rubik "
                  >
                    <p className="line-clamp-1"> {label}</p>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
