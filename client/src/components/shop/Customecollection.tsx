"use client";

import ProductCard from "../product/ProductCard";
import { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import  api from "@/utils/api";
import { toast } from "react-toastify";



export default function CustomeCollection() {
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
  return (
    <section className="py-8">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[32px] font-bold font-lato text-black mb-2">
            Custom Collection
          </h2>
          <p className="text-muted font-rubik font-light text-base">
            Section Brief Here
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="overflow-hidden grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <div key={index} className=" w-full">
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
        </div>
      </div>
    </section>
  );
}
