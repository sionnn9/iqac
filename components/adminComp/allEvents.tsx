"use client";

import React, { useEffect, useState } from "react";

export default function EventsAdmin({
  departmentId,
}: {
  departmentId: string | null;
}) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch the data directly in the component
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_LINK}admin/getAllEvents?departmentId=${departmentId}`,
          { method: "GET", credentials: "include" },
        ); // Replace with your actual list API
        const data = await response.json();
        console.log(data);
        setEvents(data.events);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // 2. Handle "Loading" State
  if (loading) return <div className="p-10 text-center">Loading events...</div>;

  // 3. Handle "Empty" State
  if (events.length === 0) {
    return (
      <div className="p-10 text-center border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-500">Nothing found.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 ">
      <div className=" flex flex-wrap justify-center items-center">
        {events.map((event) => (
          <div
            key={event._id}
            className="flex m-5 flex-col justify-between w-[300px] bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-gray-800 line-clamp-1 capitalize">
                  {event.title}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                    event.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {event.completed ? "Completed" : "Incomplete"}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-400">Type</span>
                  <span className="font-medium">{event.type}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Mode</span>
                  <span className="font-medium capitalize">{event.mode}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
