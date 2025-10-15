// src/components/providers/AppProvider.tsx
"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hook";
import { fetchUser } from "@/redux/userslice";
import { ToastContainer } from "react-toastify";


export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
