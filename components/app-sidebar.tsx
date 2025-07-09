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
      name: "Update Events",
      url: "./update",
      icon: Map,
    },
  ],

  Cources: [
    {
      name: "BCA",
      logo: Map,
      plan: "Admin block",
    },
    {
      name: "BBA",
      logo: Map,
      plan: "Admin block",
    },
    {
      name: "BSe",
      logo: Map,
      plan: "Admin block",
    },
    {
      name: "MCA",
      logo: Map,
      plan: "Admin block",
    },
    {
      name: "BVOC",
      logo: Map,
      plan: "Admin block",
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
        <TeamSwitcher teams={data.Cources}></TeamSwitcher>
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
