import SizeChart from "@/components/info/SizeChart";
import { sizeGuideMetadata } from "@/constants/metadata";
export const metadata = sizeGuideMetadata;

export default function LoginHome() {
  return (
    <main className="min-h-screen">
      <SizeChart />
    </main>
  );
}
