import React, { useEffect, useState } from "react";

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

    const values = {
      eventId: _id,
      title: formData.get("title") as string,
      description: formData.get("desc") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      level: formData.get("level") as string,
    };

    console.log(values);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}user/completeEvent`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      const data = await res.json();

      console.log("Server response:", data);

      if (res.ok) {
        alert(data.message);
        await getEvents();
      }
    } catch (err) {
      console.error("Error:", err);
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
              Conduct Mode
            </span>
            <span className="text-card-foreground font-semibold">{mode}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Number participants
            </span>
            <span className="text-card-foreground font-semibold">
              {participants}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Phase
            </span>
            <span className="text-card-foreground font-semibold">{phase}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Academic Year
            </span>
            <span className="text-card-foreground font-semibold">
              {academic_year}
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
          <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors">
            Edit Event
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-center flex flex-col items-center">
            <DialogTitle className="text-card-foreground">{type}</DialogTitle>
            <DialogDescription>Update the event details.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Existing Fields */}
            <div className="grid gap-2">
              <Label htmlFor="title-1" className="text-card-foreground">
                Title
              </Label>
              <Input
                id="title-1"
                name="title"
                placeholder="Event title"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="desc" className="text-card-foreground">
                Description
              </Label>
              <Input
                id="desc"
                name="desc"
                placeholder="Description of event"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* --- NEW SPEAKER SECTION --- */}
            <div className="pt-2 pb-1">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Speakers
              </h4>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="speaker-1" className="text-card-foreground">
                Speaker 1 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="speaker-1"
                name="speaker1"
                required
                placeholder="Primary speaker name"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="speaker-2" className="text-card-foreground">
                Speaker 2{" "}
                <span className="text-xs text-muted-foreground ml-1">
                  (Optional)
                </span>
              </Label>
              <Input
                id="speaker-2"
                name="speaker2"
                placeholder="Additional speaker"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="speaker-3" className="text-card-foreground">
                Speaker 3{" "}
                <span className="text-xs text-muted-foreground ml-1">
                  (Optional)
                </span>
              </Label>
              <Input
                id="speaker-3"
                name="speaker3"
                placeholder="Additional speaker"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {/* --- END SPEAKER SECTION --- */}

            <div className="grid gap-2">
              <Label htmlFor="date-1" className="text-card-foreground">
                Date
              </Label>
              <Input
                id="date-1"
                name="date"
                type="date"
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="time-1" className="text-card-foreground">
                Time
              </Label>
              <Input
                id="time-1"
                name="time"
                type="time"
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="level-1" className="text-card-foreground">
                Level
              </Label>
              <Input
                id="level-1"
                name="level"
                placeholder="1 / 2 / 3"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file-1" className="text-card-foreground">
                Upload Event File
              </Label>
              <Input
                id="file-1"
                name="file"
                type="file"
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-border text-card-foreground hover:bg-card bg-transparent"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
