import {About} from "@/components";
import { aboutPageMetadata } from "@/constants/metadata";

export const metadata = aboutPageMetadata;

export default function LoginHome() {
  return (
    <main className="min-h-screen">
      <About />
    </main>
  );
}
