"use client";
import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserButton, ClerkProvider } from "@clerk/nextjs";

// This is sample data.
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
      url: "/userDashboard/update",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
      <SidebarFooter>
        <ClerkProvider>
          <div className="flex justify-center items-center">
            <UserButton />
            <SidebarGroupLabel className="ml-2 text-sm">
              Your account
            </SidebarGroupLabel>
          </div>
        </ClerkProvider>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
