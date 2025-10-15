import { Footer, Header, NavigationIndex } from "@/layout";
import { Navbar, Login, BrowseCategories } from "@/components";
import { loginPageMetadata } from "@/constants/metadata";

export const metadata=loginPageMetadata
export default function LoginHome() {
  return (
    <main className="min-h-screen">
      <Header/>
      <div className="sticky top-0 z-50 bg-white border-t border-color">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.2fr_2.3fr] items-center justify-center gap-6">
          <BrowseCategories />
          <Navbar />
        </div>
      </div>
      <NavigationIndex />
      <Login />
      <Footer/>
    </main>
  );
}
