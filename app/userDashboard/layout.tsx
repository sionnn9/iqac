"use client";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useRouter } from "next/navigation";
import { useLoggedin } from "../store";
import { useEffect } from "react";
const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isLoggedin = useLoggedin();

  // if user is not logged in
  useEffect(() => {
    if (!isLoggedin.isLoggedin || isLoggedin.role == "admin") {
      router.push("/");
    }
  }, [isLoggedin, router]);
  return (
    <div className="w-screen h-screen flex ">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
