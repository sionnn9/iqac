"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  const colleges = [1, 2, 3, 4, 5];

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-950 w-full h-16 flex items-center px-4 sm:px-6">
        <SidebarTrigger className="text-white mr-4" />
        <h1 className="text-white text-lg sm:text-xl font-semibold flex-1 text-center sm:text-left">
          Colleges
        </h1>
      </div>

      {/* Card Grid */}
      <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {colleges.map((num) => (
          <button
            key={num}
            onClick={() => (window.location.href = `/adminDashboard/course`)}
            className="w-full aspect-square bg-white shadow-md rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-gray-100 transition duration-200"
          >
            {/* Icon */}
            <div className="text-4xl bg-blue-100 text-blue-700 p-4 rounded-full">
              🎓
            </div>

            {/* College Name */}
            <div className="text-center font-semibold text-base sm:text-lg">
              St. Aloysius College {num}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
