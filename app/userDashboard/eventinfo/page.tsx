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

type CourseCardProps = {
  heading: string;
  course: string;
  phase: string;
  status: "Completed" | "Not Completed";
};

const CourseCard: React.FC<CourseCardProps> = ({
  heading,
  course,
  phase,
  status,
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
              <Label htmlFor="description-1">Description</Label>
              <Input
                id="description-1"
                name="description"
                placeholder="Description"
              />
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
  const totalCards = 3;

  const courseData: CourseCardProps[] = Array.from(
    { length: totalCards },
    (_, i) => ({
      heading: `Event`,
      course: `BCA`,
      phase: `Phase 1`,
      status: i % 2 === 0 ? "Completed" : "Not Completed",
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

      <div className="flex justify-center items-center font-semibold text-3xl pt-4 ">
        Event name
      </div>
      <div className="flex flex-wrap justify-center mt-4">
        {courseData.map((item, index) => (
          <CourseCard
            key={index}
            heading={item.heading}
            course={item.course}
            phase={item.phase}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
