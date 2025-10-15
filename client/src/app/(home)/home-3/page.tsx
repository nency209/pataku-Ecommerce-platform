import { Metadata } from "next";
import { homePageMetadata } from "@/constants/metadata";
import { Footer, Header } from "@/layout";

import {
  Home3Hero,
  Home2Banner,
  Home2Brand,
  Home2FeaturedCategories,
  BottomSections,
  LivingRoomBanner,
  Navbar,
  Home3NewArrival,
} from "@/components/home/sections";

export const metadata: Metadata = {
  ...homePageMetadata,
  title: "Home Shop 3 | Pataku",
  description:
    "Discover Home Shop 3 with a fresh green theme and a modern minimal layout.",
};

export default function Home3Page() {
  return (
    <main className="theme-home3 min-h-screen ">
      <Header />
      <div className="sticky top-0 z-50 border border-color">
        <div className="flex justify-center bg-navbar">
          <Navbar />
        </div>
      </div>
      <Home3Hero />
      <Home3NewArrival />
      <Home2Banner />
      <BottomSections />
      <LivingRoomBanner />
      <Home2FeaturedCategories />
      <Home2Brand />
      <Footer />
    </main>
  );
}
