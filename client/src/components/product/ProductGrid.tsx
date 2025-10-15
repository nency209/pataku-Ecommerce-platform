import { Product } from "@/types";
import ProductShopCard from "./ProductShopCard";



export default function ProductGrid({ products }: { products: Product[] }) {

 
  
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductShopCard key={p._id} products={p} />
      ))}
    </div>
  );
}
