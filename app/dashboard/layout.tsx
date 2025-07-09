import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar /> <SidebarTrigger className="w-15 h-15 ml-3" />
        <main>{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
