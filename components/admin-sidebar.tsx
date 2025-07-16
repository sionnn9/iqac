"use client";
import * as React from "react";
import { Frame, PieChart } from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { userstore } from "@/app/store";

import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  activities: [
    {
      name: "Events",
      url: "/adminDashboard/eventControl",
      icon: Frame,
    },
    {
      name: "userApproval",
      url: "/adminDashboard/userApproval",
      icon: PieChart,
    },
  ],
};

export function AdminAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const userinfo = userstore();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarContent>
          {" "}
          <div className="w-full h-20 flex justify-center items-center flex-col">
            <div className="flex flex-col">
              <SidebarGroupLabel className="truncate font-medium text-2xl">
                {"IQAC"}
              </SidebarGroupLabel>
              <SidebarGroupLabel className="truncate text-xs mt-0">
                {"St Aloysius College"}
              </SidebarGroupLabel>
            </div>
          </div>
        </SidebarContent>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.activities} />
      </SidebarContent>
      <ClerkProvider>
        <div className="flex justify-center items-center">
          <UserButton />
          <SidebarGroupLabel className="ml-2 text-sm">
            {userinfo.userdetails.name}
          </SidebarGroupLabel>
        </div>
      </ClerkProvider>
      <SidebarRail />
    </Sidebar>
  );
}
