import { Product } from "@/types";
import ProductShopCard from "./ProductShopCard";

export default function ProductList({ products }: { products: Product[] }) {

  
  return (
    <div className="space-y-4">
      {products.map((p) => (
        <div key={p._id} className="py-4  flex gap-4 items-center">
          <ProductShopCard products={p} list />
        </div>
      ))}
    </div>
  );
}
