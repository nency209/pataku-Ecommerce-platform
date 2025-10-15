import { Metadata } from "next";
import { homePageMetadata } from "@/constants/metadata";
import {
  Home2Hero,
  Home2LivingRoomBanner,
  Home2NewArrivals,
  LivingRoomBanner,
  Home2Banner,
  Home2FeaturedCategories,
  Home2Brand,
  Navbar,
  OutdoorFurnitureProduct,
  DiningRoomProduct,
} from "@/components/home/sections";

import BlogPosts from "@/components/blog/BlogPosts";
import { Footer, Header } from "@/layout";

export const metadata: Metadata = {
  title: "Home Shop 2 | Pataku",
  description:
    "Explore our second home shop variant featuring modern furniture and home decor. Discover unique pieces for your living space.",
};

export default function Home2Page() {
  return (
    <div className="theme-home2">
      <Header />
      <div className="bg-navbar sticky top-0 z-50">
        <div className="max-w-6xl mx-auto border-color flex justify-center xl:justify-start">
          <Navbar />
        </div>
      </div>

      <Home2Hero />
      <Home2NewArrivals />
      <Home2LivingRoomBanner />
      <DiningRoomProduct />
      <LivingRoomBanner />
      <OutdoorFurnitureProduct />
      <Home2Banner />
      <Home2FeaturedCategories />
      <Home2Brand />
      <BlogPosts />
      <Footer />
    </div>
  );
}
