import { Metadata } from "next";
import { homePageMetadata } from "@/constants/metadata";
import {
  Hero,
  FeaturedCategories,
  NewArrivals,
  PromotionalBanner,
  BottomSections,
  LivingRoomBanner,
  TopSellingProducts,
  BrowseCategories,
  Navbar,
  BlogPosts,
} from "@/components";
import { Footer, Header } from "@/layout";

export const metadata: Metadata = homePageMetadata;

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className=" bg-white border-t border-color">
        <div
          className="
              grid grid-cols-1 gap-8 lg:gap-6 md:gap-0
             sm:grid-cols-1 sm:items-center sm:justify-center
               md:grid-cols-2 md:items-center md:justify-center 
             lg:grid-cols-[0.5fr_1.1fr] lg:items-center lg:justify-start
          xl:grid-cols-[1.2fr_2.3fr]"
        >
          <BrowseCategories />
          <Navbar />
        </div>
      </div>
      <Hero />
      <FeaturedCategories />
      <NewArrivals />
      <PromotionalBanner />
      <BottomSections />
      <LivingRoomBanner />
      <TopSellingProducts />
      <BlogPosts />
      <Footer />
    </main>
  );
}
