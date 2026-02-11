"use client";
import React, { useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Page = () => {
  const getAllEvents = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}user/getAllEvents`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to fetch events");
      }

      const data = await response.json();
      console.log("Events:", data);
      return data;
    } catch (error: any) {
      console.error("Fetch events error:", error.message);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <div className="w-full h-auto ">
      <div className="bg-gray-950 w-full h-20 flex items-center">
        <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
        <div className="w-full text-white flex justify-center items-center text-xl pr-9">
          {"Upcomming Events"}
        </div>
      </div>
    </div>
  );
};

export default Page;
