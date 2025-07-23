import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

const page = () => {
  return (
    <div className="w-full h-full  flex-col">
      <div className="bg-gray-950 w-full h-16 flex items-center px-4 sm:px-6">
        <SidebarTrigger className="text-white mr-4" />
        <h1 className="text-white text-lg sm:text-xl font-semibold flex-1 text-center sm:text-left pr-9">
          Users
        </h1>
      </div>
    </div>
  );
};

export default page;
