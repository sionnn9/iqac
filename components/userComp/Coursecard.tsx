"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

type event = {
  _id: string;
  mode: string;
  participants: number;
  type: string;
  status: string;
  phase: number;
  getEvents: () => void;
  academic_year: string;
};

export const UploadEventDetails: React.FC<event> = ({
  _id,
  mode,
  participants,
  type,
  status,
  phase,
  getEvents,
  academic_year,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Mapped to match your Mongoose Schema exactly
    const speakers = [
      formData.get("speaker1") as string,
      formData.get("speaker2") as string,
      formData.get("speaker3") as string,
    ].filter((s) => s && s.trim() !== "");
    const values = {
      eventId: _id,
      title: formData.get("title") as string,
      description: formData.get("desc") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      level: Number(formData.get("level")), // Schema expects Number
      venue: formData.get("venue") as string, // Added venue
      completed: true,
      reportPdf: formData.get("file") as File,

      speakers: speakers,

      participants: formData.get("Participants") as string,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}user/completeEvent`,
        {
          method: "PUT",
          credentials: "include",

          body: JSON.stringify(values),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Event updated successfully");
        await getEvents();
      } else {
        toast.error(data.message || "Event updated successfully");
        await getEvents();
      }
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  return (
    <Dialog>
      <div className="bg-card rounded-lg shadow-md p-6 m-4 w-full max-w-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary">
        <h2 className="text-lg font-bold text-card-foreground mb-4 mt-2">
          {type}
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Mode
            </span>
            <span className="text-card-foreground font-semibold capitalize">
              {mode}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Participants
            </span>
            <span className="text-card-foreground font-semibold">
              {participants}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-sm font-medium text-muted-foreground">
              Status
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                status === "completed"
                  ? "bg-green-100 text-green-900"
                  : "bg-destructive/20 text-destructive"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <DialogTrigger asChild>
          <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Edit Event
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-card border-border">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-center flex flex-col items-center">
            <DialogTitle className="text-card-foreground">
              Update {type}
            </DialogTitle>
            <DialogDescription>
              Enter the final event details for the report.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Event Title"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Input id="desc" name="desc" placeholder="Brief summary" />
            </div>

            {/* Speaker Section Kept as Requested */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-muted-foreground uppercase">
                Speakers
              </h4>
              <div className="grid gap-3 mt-2">
                <Input name="speaker1" required placeholder="Speaker 1 Name" />
                <Input name="speaker2" placeholder="Speaker 2 (Optional)" />
                <Input name="speaker3" placeholder="Speaker 3 (Optional)" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" type="time" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  name="level"
                  type="number"
                  placeholder="1-3"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" name="venue" placeholder="Hall/Room Name" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="venue">Participants</Label>
                <Input
                  id="venue"
                  name="Participants"
                  placeholder="no of Participants"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file">Event Report/PDF</Label>
              <Input
                id="file"
                name="file"
                type="file"
                className="cursor-pointer"
              />
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Complete & Save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
