import { cartPageMetadata } from "@/constants/metadata";
import CartPage from "@/components/cart/cart";
import { BrowseCategories, Navbar } from "@/components";
import { Footer, Header, NavigationIndex } from "@/layout";

export const metadata = cartPageMetadata;

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
      <CartPage />
      <Footer />
    </main>
  );
}
