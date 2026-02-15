"use client";
import * as React from "react";
import { Frame, Map, PieChart } from "lucide-react";
import { NavProjects } from "@/components/nav-projects";

import { userstore } from "@/app/store";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data. gg
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  activities: [
    {
      name: "Upcomming Events",
      url: "/userDashboard/upcomming",
      icon: Frame,
    },
    {
      name: "Completed Events",
      url: "/userDashboard/pastEvents",
      icon: PieChart,
    },
    {
      name: "Upload CV",
      url: "/userDashboard/upload",
      icon: Map,
    },
    {
      name: "Update Events",
      url: "/userDashboard/eventinfo",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const username = userstore();
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
                {"St. Aloysius (Deemed to be University)"}
              </SidebarGroupLabel>
            </div>
          </div>
        </SidebarContent>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.activities} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
