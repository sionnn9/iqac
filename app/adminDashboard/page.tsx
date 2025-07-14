
"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  const colleges = [1, 2, 3, 4, 5];

  return (
    <div className="w-full h-auto ">
          <div className="bg-gray-950 w-full h-20 flex items-center">
            <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
            <div className="w-full text-white flex justify-center items-center text-xl">
              {"Colleges"}
            </div>
          </div>
       


    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-6">
      {colleges.map((num) => (
        <button
          key={num}
          className="w-56 h-56 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-gray-100 transition duration-200"
          onClick={() => window.location.href = "/adminDashboard/course"}
        >
          {/* Dummy Icon */}
          <div className="text-5xl bg-blue-100 text-blue-700 p-4 rounded-full">
            🎓
          </div>

          {/* Dynamic Label */}
          <div className="text-center font-semibold text-lg">
            St. Aloysius College {num}
          </div>
        </button>
      ))}
    </div>
     </div>
  );
}
