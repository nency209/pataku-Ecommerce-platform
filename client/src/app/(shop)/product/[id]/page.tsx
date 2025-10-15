import { Metadata } from "next";

import { BrowseCategories, Navbar } from "@/components";
import ProductDetail from "@/components/product/ProductDetail";
import CustomeCollection from "@/components/shop/Customecollection";
import RelatedProduct from "@/components/shop/RelatedProduct";
import ProductTabs from "@/components/shop/ProductTabs";
import { Footer, Header, NavigationIndex } from "@/layout";



export default function NewSaleProductPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="sticky top-0 z-50 bg-white border-t border-color">
        <div
          className="
          grid 
          grid-cols-1 
          gap-6 
          lg:grid-cols-[0.5fr_1fr] lg:items-center lg:justify-start
          xl:grid-cols-[1.2fr_2.3fr]
        "
        >
          <BrowseCategories />

          <Navbar />
        </div>
      </div>
      <NavigationIndex />
      <ProductDetail />
      <ProductTabs />
      <RelatedProduct />
      <CustomeCollection />
      <Footer />
    </main>
  );
}
