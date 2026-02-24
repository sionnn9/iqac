"use client";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import CompletedEvent from "@/components/userComp/CompletedEventsCard";
interface data {
  mode: string;
  type: string;
  completed: boolean;
  description: string;
  level: number;
  title: string;
}

const Page = () => {
  const [events, setEvents] = useState<data[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_LINK}user/completedEvents`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        console.log(data.events);
        setEvents(data.events);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div className="w-full h-auto ">
      <div className="bg-gray-950 w-full h-20 flex items-center">
        <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
        <div className="w-full text-white flex justify-center items-center text-xl pr-9"></div>
      </div>
      {events.map((data) => {
        return (
          <CompletedEvent
            mode={data.mode}
            type={data.type}
            completed={data.completed}
            description={data.description}
            level={data.level}
            title={data.title}
          />
        );
      })}
    </div>
  );
};

export default Page;
