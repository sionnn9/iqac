import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Page = () => {
  return (
    <div className="w-full h-auto ">
      <div className="bg-gray-950 w-full h-20 flex items-center">
        <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
        <div className="w-full text-white flex justify-center items-center text-xl pr-9">
          {"Update Events"}
        </div>
      </div>
    </div>
  );
};

export default Page;
