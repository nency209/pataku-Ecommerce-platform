import { wishlistPageMetadata } from "@/constants/metadata";
import { BrowseCategories, Navbar, WishlistPage, } from "@/components";
import { NavigationIndex, Header, Footer } from "@/layout";

export const metadata = wishlistPageMetadata;

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
      <WishlistPage/>
      

      <Footer />
    </main>
  );
}
