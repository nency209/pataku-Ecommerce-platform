"use client";
import { useState, useMemo, useEffect } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import ProductList from "@/components/product/ProductList";
import AvailabilityFilter from "@/components/shop/filters/AvailabilityFilter";
import PriceFilter from "@/components/shop/filters/PriceFilter";
import ProductTypeFilter from "@/components/shop/filters/ProductTypeFilter";

import { Button } from "../ui";
import { Grid, List } from "lucide-react";
import { Product } from "@/types";
import api from "@/utils/api";

export default function ShopPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("az");
  const [product, setProduct] = useState<Product[]>([]);

  const [filters, setFilters] = useState({
    availability: "",
    price: [0, 500],
    category: [] as string[], // ✅ use category instead of productType
  });

  // 📌 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/products");
      setProduct(res.data);
    };
    fetchProducts();
  }, []);

  // 🔎 Filtering Logic
  const filteredProducts = useMemo(() => {
    return product.filter((p: any) => {
      const stock = p.stock ?? 0;
      const colors = p.colors ?? [];
      const sizes = p.sizes ?? [];

      // availability
      if (filters.availability === "in" && stock > 0) return true;
      if (filters.availability === "out" && stock <= 0) return true;
      if (filters.availability === "low" && stock > 0 && stock <= 10)
        return true;

      // price
      if (p.price < filters.price[0] || p.price > filters.price[1])
        return false;

      if (filters.category.length > 0 && !filters.category.includes(p.category))
        return false;

      return true;
    });
  }, [filters, product]);

  // 🔃 Sorting
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    if (sort === "az") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") sorted.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "low")
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "high")
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    return sorted;
  }, [filteredProducts, sort]);

  // 📌 Paginate
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedProducts.slice(start, end);
  }, [sortedProducts, currentPage]);

  return (
    <div className="container mx-auto px-36">
      <div className="grid grid-cols-12 gap-6 p-6 mx-auto ">
        {/* Sidebar */}
        <aside className="col-span-3 space-y-6 px-6">
          <AvailabilityFilter filters={filters} setFilters={setFilters} />
          <PriceFilter filters={filters} setFilters={setFilters} />
          <ProductTypeFilter filters={filters} setFilters={setFilters} />
        </aside>

        {/* Products */}
        <main className="col-span-9 ">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-6 pb-4">
            {/* View toggle */}
            <div className="flex gap-2 items-center">
              <Button onClick={() => setView("grid")}>
                <Grid className="h-4 w-4 text-hover" />
              </Button>
              <Button onClick={() => setView("list")}>
                <List className="h-4 w-4" />
              </Button>

              {/* Results */}
              <p className="text-sm text-gray-600 text-center">
                Showing {paginatedProducts.length} of {sortedProducts.length}{" "}
                results
              </p>
            </div>

            {/* Sort */}
            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1); // reset page on sort
              }}
            >
              <option value="az">Alphabetically, A-Z</option>
              <option value="za">Alphabetically, Z-A</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Product Display */}
          {view === "grid" ? (
            <ProductGrid products={paginatedProducts} />
          ) : (
            <ProductList products={paginatedProducts} />
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
