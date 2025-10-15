"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/dashboards/admin/layout/sidebar";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { clearUser } from "@/redux/userslice";
import { useRouter } from "next/navigation";
import { TopNavigation } from "@/components/dashboards/admin/layout/Navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const handleToggle = () => setCollapsed(!collapsed);

  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // ✅ Redirect if not admin
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/dashboard"); // normal user dashboard
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return null; // prevent flicker while redirecting
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar (admin only) */}
      <AdminSidebar collapsed={collapsed} onToggle={handleToggle} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-auto">
        {/* ✅ Admin Top Navigation */}
        <TopNavigation
          user={user}
          onToggleSidebar={handleToggle}
          onLogout={() => {
            dispatch(clearUser());
            localStorage.removeItem("user");
            router.push("/login");
          }}
          
        />

        {/* Page Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
