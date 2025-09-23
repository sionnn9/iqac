"use client";
import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminAppSidebar } from "@/components/admin-sidebar";
import { useLoggedin } from "../store";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isLoggedin = useLoggedin();

  // if user is not logged
  /*  useEffect(() => {
    if (!isLoggedin.isLoggedin || isLoggedin.role == "user") {
      router.push("/");
    }
  }, [isLoggedin, router]);*/

  return (
    <div className="w-screen h-screen flex">
      <SidebarProvider>
        <AdminAppSidebar />
        <main className="w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
