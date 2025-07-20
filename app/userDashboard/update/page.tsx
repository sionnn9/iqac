"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  const Event = [1, 2, 3, 4, 5];

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-950 w-full h-16 flex items-center px-4 sm:px-6">
        <SidebarTrigger className="text-white mr-4" />
        <h1 className="text-white text-lg sm:text-xl font-semibold flex-1 text-center sm:text-left pr-9">
          Update Event
        </h1>
      </div>

      {/* Single Grid Container */}
      <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Event.map((num) => (
          <button
            key={num}
            onClick={() => (window.location.href = `/userDashboard/eventinfo`)}
            className="relative w-full aspect-square bg-white shadow-md rounded-xl flex flex-col items-center justify-center gap-4 
                       transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg overflow-hidden"
          >
            {/* Top Strip */}
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-900 rounded-t-xl" />

            {/* Icon */}
            <div className="text-4xl bg-blue-100 text-blue-700 p-4 rounded-full z-10">
              🎓
            </div>

            {/* Label */}
            <div className="text-center font-bold text-lg sm:text-lg pt-3 z-10">
              Event {num}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
