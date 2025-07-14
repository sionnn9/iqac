import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const page = () => {
  return (
    <div className="w-full h-auto ">
      <div className="bg-gray-950 w-full h-20 flex items-center">
        <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
        <div className="w-full text-white flex justify-center items-center text-xl pr-9">
          {"Course"}
        </div>
      </div>

      <div className="p-4">
        <button className="w-44 h-44 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition duration-200">
          {/* Dummy Icon */}
          <div className="text-4xl bg-blue-100 text-blue-700 p-3 rounded-full">
            🎓
          </div>

          {/* Text */}
          <div className="text-base font-semibold">BCA</div>
        </button>
      </div>
    </div>
  );
};

export default page;
