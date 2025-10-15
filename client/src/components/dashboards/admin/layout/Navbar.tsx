"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, User, Settings, LogOut, HelpCircle } from "lucide-react";
import {
  Button,
  Input,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Badge,
} from "../../../ui";
import { useRouter } from "next/navigation";
import { User as ReduxUser } from "@/types";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

interface TopNavigationProps {
  user: ReduxUser | null;
  onToggleSidebar: () => void;
  onLogout: () => void;
}

const socket = io("https://pataku-server.onrender.com"); // ✅ connect once

export function TopNavigation({
  user,
  onToggleSidebar,
  onLogout,
  
}: TopNavigationProps) {

  const [notifications, setNotifications] = useState<
    { id: number; message: string; time: string; unread: boolean }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    // ✅ Listen for stock alerts
    socket.on("stock_alert", (data) => {
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: data.message,
          time: "just now",
          unread: true,
        },
        ...prev,
      ]);
      toast.warning(data.message);
    });

    // ✅ Listen for new order alerts
    socket.on("new_order", (data) => {
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: `New order #${data.orderId} received`,
          time: "just now",
          unread: true,
        },
        ...prev,
      ]);
      toast.info(data.message);
    });

    return () => {
      socket.off("stock_alert");
      socket.off("new_order");
    };
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="bg-background border-b border-color px-6 py-2">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            ☰
          </Button>

          <div className="relative w-96 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products, orders, customers..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4  z-10">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white">
              <div className="p-3 border-b">
                <h4>Notifications</h4>
              </div>
              {notifications.length === 0 && (
                <p className="p-3 text-sm text-muted-foreground">
                  No notifications yet
                </p>
              )}
              {notifications.map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  className="p-3 flex-col items-start"
                >
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm">{n.message}</p>
                    {n.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3 text-center text-sm text-primary cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile (unchanged) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 p-2"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={user?.avatar ?? ""}
                    alt={user?.name ?? "U"}
                  />
                  <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm">{user?.name}</p>
                  
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                Signed in as {user?.email}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/admin/profile")}
              >
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="text-destructive cursor-pointer focus:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
