"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import CurrentSemesterStatus from "./semisterDisplay";

interface DateRangeCardProps {
  DepartmentId: string | null;
}
interface ISemesterConfig {
  _id?: string; // MongoDB generated ID
  branch: string; // The Branch ObjectId
  isActive: boolean;
  semester: {
    start: string | Date; // Use string for API responses (ISO format)
    end: string | Date;
  };
  createdAt?: string; // Optional timestamps
  updatedAt?: string;
}

export default function AddSemisterDates({ DepartmentId }: DateRangeCardProps) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSem, setIsSem] = useState(false);
  const [responcedata, setResponceData] = useState<ISemesterConfig>();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}admin/addSemester`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            branchId: DepartmentId,
            start,
            end,
          }),
          credentials: "include",
        },
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert(data.message);
      } else {
        setOpen(true);
      }

      setStart("");
      setEnd("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getSemesters = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}admin/getSemester?branchId=68d37c98242d51d89f71554b`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();
      setIsSem(data.isActive);
      setResponceData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSemesters();
  }, []);

  if (isSem) {
    return (
      <CurrentSemesterStatus
        start={responcedata?.semester.start || "2026-07-15"}
        end={responcedata?.semester.end || "2026-12-20"}
      />
    );
  } else {
    return (
      <>
        <div className="w-full max-w-md">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Semester Duration
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-base">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  End Date
                </label>
                <Input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full rounded-2xl"
                onClick={handleSubmit}
                disabled={!start || !end || loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </CardFooter>
          </Card>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Completed</DialogTitle>
                <DialogDescription>
                  Semester dates saved successfully.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button className="rounded-2xl" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
}
