import { Metadata } from "next";
import { homePageMetadata } from "@/constants/metadata";

import {
  Home4Hero,
  FeaturedCategories,
  NewArrivals,
  PromotionalBanner,
  BottomSections,
  LivingRoomBanner,
  TopSellingProducts,
  Navbar,
} from "@/components/home/sections";

import BlogPosts from "@/components/blog/BlogPosts";
import { Footer, Header } from "@/layout";

export const metadata: Metadata = homePageMetadata;

export default function Home4Page() {
  return (
    <main className="theme-home4 min-h-screen">
      <Header />
      <div className="sticky top-0 z-50 border border-color">
        <div className="flex justify-center bg-navbar">
          <Navbar />
        </div>
      </div>
      <Home4Hero />
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
