"use client";
import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "../../costomcomp/userComp/Coursecard";

type event = {
  _id: string;
  mode: string;
  participants: number;
  type: string;
  status: string;
  phase: number;
  academic_year: string;
};

const Page: React.FC = () => {
  const [events, setEvents] = useState<event[] | null>();

  const getEvents = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}user/getAllEvents`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      const data = await responce.json();

      console.log(data);
      if (responce.ok) {
        console.log(data);
        setEvents(data.events);
      } else {
        console.log(data);
        console.log("Error fetching branches");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="w-full  h-auto min-h-screen bg-gray-100">
      <div className="bg-gray-950 w-full h-20 flex items-center">
        <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
        <div className="w-full text-white flex justify-center items-center text-xl pr-9">
          Events edit place
        </div>
      </div>
      <Tabs
        defaultValue="phase1"
        className="w-full mt-6 flex flex-col justify-center items-center"
      >
        <div className="flex justify-center">
          <TabsList className="mb-4">
            <TabsTrigger value="phase1">Phase 1</TabsTrigger>
            <TabsTrigger value="phase2">Phase 2</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="phase1" className="flex flex-wrap">
          {events &&
            events
              ?.filter((data) => data.phase == 1)
              .map((data, index) => (
                <CourseCard
                  _id={data._id}
                  key={index}
                  mode={data.mode}
                  participants={data.participants}
                  getEvents={getEvents}
                  type={data.type}
                  status={data.status}
                  phase={data.phase}
                  academic_year={data.academic_year}
                />
              ))}
        </TabsContent>

        <TabsContent value="phase2" className="flex flex-wrap">
          {events &&
            events
              ?.filter((data) => data.phase == 2)
              .map((data, index) => (
                <CourseCard
                  key={index}
                  _id={data._id}
                  mode={data.mode}
                  getEvents={getEvents}
                  participants={data.participants}
                  type={data.type}
                  status={data.status}
                  phase={data.phase}
                  academic_year={data.academic_year}
                />
              ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
