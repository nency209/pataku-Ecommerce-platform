;
import ProfilePage from "@/components/dashboards/user/profile";
import { aboutPageMetadata } from "@/constants/metadata";

export const metadata=aboutPageMetadata

export default function AdminProfilePage() {
  return (
    <main className="min-h-screen">
       <ProfilePage/>
    </main>
  );
}
