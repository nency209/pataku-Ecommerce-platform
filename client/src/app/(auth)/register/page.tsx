import { Footer, Header, NavigationIndex } from "@/layout";
import { BrowseCategories, Navbar, Register } from "@/components";
import { registerPageMetadata } from "@/constants/metadata";

export const metadata=registerPageMetadata
export default function RegisterHome() {
  return (
    <main className="min-h-screen">
      <Header/>
     <div className="sticky top-0 z-50 bg-white border-t border-color">
        <div
          className="
    grid 
    grid-cols-1 
    gap-8 
    lg:gap-6
    md:gap-0
    sm:grid-cols-1 sm:items-center sm:justify-center
    md:grid-cols-2 md:items-center md:justify-center 
    lg:grid-cols-[0.5fr_1.1fr] lg:items-center lg:justify-start
    xl:grid-cols-[1.2fr_2.3fr]
  "
        >
          <BrowseCategories />

          <Navbar />
        </div>
      </div>
      <NavigationIndex />
      <Register />
      <Footer/>
    </main>
  );
}
