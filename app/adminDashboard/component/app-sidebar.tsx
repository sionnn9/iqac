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
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

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
      url: "./upcomming",
      icon: Frame,
    },
    {
      name: "Completed Events",
      url: "./pastEvents",
      icon: PieChart,
    },
    {
      name: "Upload CV",
      url: "./upload",
      icon: Map,
    },
    {
      name: "boobs",
      url: "./update",
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
