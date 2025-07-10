import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminAppSidebar } from "@/components/admin-sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <SidebarProvider>
        <AdminAppSidebar />
        <main className="w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
