"use client";
import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Department = {
  _id: string;
  name: string;
  branchId: string;
};

type Event = {
  _id: string;
  department: Department;
  mode: string;
  participants: number;
  type: string;
  completed: boolean;
};

function EventCard({ event }: { event: Event }) {
  return (
    <Card className="w-full max-w-md shadow-md rounded-2xl m-10">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl capitalize">{event.type}</span>

          <Badge variant={event.completed ? "default" : "secondary"}>
            {event.completed ? "Completed" : "Pending"}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Department</span>
          <span className="font-medium">{event.department.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Mode</span>
          <span className="capitalize">{event.mode}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Participants</span>
          <span>{event.participants}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Event ID</span>
          <span className="text-xs">{event._id.slice(-6)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

const Page = () => {
  const [upcommingevents, setUpcommingEvents] = useState([]);
  const getUpcomingEvents = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}user/upcomingEvents`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await res.json();
      console.log("Upcoming events:", data.events);
      setUpcommingEvents(data.events);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUpcomingEvents();
  }, []);
  return (
    <div className="w-full h-auto ">
      <div className="bg-gray-950 w-full h-20 flex items-center">
        <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
        <div className="w-full text-white flex justify-center items-center text-xl pr-9">
          {"Upcomming Events"}
        </div>
      </div>
      {upcommingevents?.length > 0
        ? upcommingevents.map((data, index) => (
            <EventCard key={index} event={data} />
          ))
        : "No upcoming events"}
    </div>
  );
};

export default Page;
