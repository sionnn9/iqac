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

      <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Event.map((eventId) => (
          <button
            key={eventId}
            onClick={() => (window.location.href = `/userDashboard/eventinfo`)}
            className="relative w-full aspect-square bg-card shadow-md border border-border rounded-lg flex flex-col items-center justify-center gap-3 
                       transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-2 hover:border-primary group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-lg group-hover:shadow-lg" />

            <div className="text-5xl bg-primary/15 text-primary p-5 rounded-xl z-10 transition-all group-hover:bg-primary/25 group-hover:scale-110">
              📋
            </div>

            <div className="text-center font-bold text-lg text-card-foreground z-10 tracking-tight">
              Event {eventId}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
