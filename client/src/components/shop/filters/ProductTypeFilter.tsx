"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api"; // axios wrapper
import { Product } from "@/types";

export default function CategoryFilter({ filters, setFilters }: any) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch all products
        const res = await api.get("/products");
        const products: Product[] = res.data;

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(products.map((p) => p.category)),
        ].filter(Boolean);

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (category: string) => {
    setFilters((f: any) => ({
      ...f,
      category: f.category.includes(category)
        ? f.category.filter((c: string) => c !== category)
        : [...f.category, category],
    }));
  };

  return (
    <div className="border border-color flex flex-col justify-center items-center space-y-2 py-6">
      <h4 className="font-medium font-rubik text-xl">Category</h4>
      <div className="space-y-2 text-sm font-rubik text-muted">
        {categories.map((c) => (
          <label key={c} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.category.includes(c)}
              onChange={() => toggleCategory(c)}
            />
            {c}
          </label>
        ))}
      </div>
    </div>
  );
}
