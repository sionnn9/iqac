"use client";
import React from "react";
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

type CourseCardProps = {
  heading: string;
  course: string;
  phase: string;
  status: "Completed" | "Not Completed";
  year: number; // 🔹 added year
};

const CourseCard: React.FC<CourseCardProps> = ({
  heading,
  course,
  phase,
  status,
  year,
}) => {
  return (
    <Dialog>
      <div className="bg-white rounded-2xl shadow-md p-6 m-4 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{heading}</h2>
        <div className="text-gray-700 mb-1">
          <span className="font-medium">Course:</span> {course}
        </div>
        <div className="text-gray-700 mb-1">
          <span className="font-medium">Phase:</span> {phase}
        </div>
        <div className="text-gray-700 mb-1">
          <span className="font-medium">Year:</span> {year} {/* 🔹 show year */}
        </div>
        <div className="text-gray-700 mb-4">
          <span className="font-medium">Status:</span>{" "}
          <span
            className={
              status === "Completed" ? "text-green-600" : "text-red-600"
            }
          >
            {status}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            Edit
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader className="text-center flex flex-col items-center">
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input id="title-1" name="title" placeholder="Title" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="date-1">Date</Label>
              <Input id="date-1" name="date" type="date" placeholder="Date" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="time-1">Time</Label>
              <Input id="time-1" name="time" type="time" placeholder="Time" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="level-1">Level</Label>
              <Input id="level-1" name="level" placeholder="Level" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="mode-1">Mode</Label>
              <Input id="mode-1" name="mode" placeholder="Mode" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="participants-1">Participants</Label>
              <Input
                id="participants-1"
                name="participants"
                placeholder="Participants"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="file-1">File</Label>
              <Input id="file-1" name="file" type="file" placeholder="File" />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Page: React.FC = () => {
  const totalCards = 5;

  const courseData: CourseCardProps[] = Array.from(
    { length: totalCards },
    (_, i) => ({
      heading: `Event`,
      course: `BCA`,
      phase: i % 2 === 0 ? "Phase 1" : "Phase 2",
      status: i % 2 === 0 ? "Completed" : "Not Completed",
      year: i, // 🔹 unique year for each card
    })
  );

  return (
    <div className="w-full h-auto min-h-screen bg-gray-100">
      <div className="bg-gray-950 w-full h-20 flex items-center">
        <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
        <div className="w-full text-white flex justify-center items-center text-xl pr-9">
          Events edit place
        </div>
      </div>
      <Tabs defaultValue="phase1" className="w-full mt-6">
        <div className="flex justify-center">
          <TabsList className="mb-4">
            <TabsTrigger value="phase1">Phase 1</TabsTrigger>
            <TabsTrigger value="phase2">Phase 2</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="phase1">
          <div className="flex flex-wrap justify-center mt-4">
            {courseData
              .filter((item) => item.phase === "Phase 1")
              .map((item, index) => (
                <CourseCard key={index} {...item} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="phase2">
          <div className="flex flex-wrap justify-center mt-4">
            {courseData
              .filter((item) => item.phase === "Phase 2")
              .map((item, index) => (
                <CourseCard key={index} {...item} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
