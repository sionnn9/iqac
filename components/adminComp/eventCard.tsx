"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Props = { DepartmentId: string | null; BranchId: string | null };

export default function AssignEventCard({ DepartmentId, BranchId }: Props) {
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [phase, setPhase] = useState("");

  const [noOfCards, setNoOfCards] = useState<number | null>(0);
  const [academicYears, setAcademicYears] = useState<string[]>([]);
  const [academicYear, setAcademicYear] = useState<string>("");

  const getAcademicYears = (startYear = 2025, count = 6) => {
    return Array.from({ length: count }, (_, i) => {
      const y1 = startYear + i;
      const y2 = y1 + 1;
      return `${y1}-${y2}`;
    });
  };

  const Submit = async () => {
    const payload = {
      department: DepartmentId,
      type: type,
      academic_year: academicYear,
      phase: phase,

      noOfCards: noOfCards,
      mode: mode,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}admin/assignEvent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Event added successfully");
      } else {
        toast.error(data.message || "Error assigning event");
      }
      console.log(data);
    } catch (err) {
      console.error("Request Failed:", err);
      toast.error("Server connection failed");
    }
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = getAcademicYears(currentYear - 4, 7);
    setAcademicYears(years);
  }, []);

  return (
    <div className="w-[300px] bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Assign Event
      </h2>

      <div className="space-y-6">
        <Select required onValueChange={setType}>
          {/* Added h-12 to triggers to make the inputs taller/chunkier */}
          <SelectTrigger className="w-full h-12 cursor-pointer">
            <SelectValue placeholder="Type of Event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seminar">Seminar</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
            <SelectItem value="guest lecture">Guest Lecture</SelectItem>
            <SelectItem value="competition">Competition</SelectItem>
          </SelectContent>
        </Select>

        <Select required onValueChange={setMode}>
          <SelectTrigger className="w-full h-12 cursor-pointer">
            <SelectValue placeholder="Mode of event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>

        <Select required onValueChange={setPhase}>
          <SelectTrigger className="w-full h-12 cursor-pointer">
            <SelectValue placeholder="Phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Phase 1</SelectItem>
            <SelectItem value="2">Phase 2</SelectItem>
          </SelectContent>
        </Select>

        <Select required onValueChange={setAcademicYear}>
          <SelectTrigger className="w-full h-12 cursor-pointer">
            <SelectValue placeholder="Academic Year" />
          </SelectTrigger>
          <SelectContent>
            {academicYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          className="h-12"
          type="number" // Note: Changed "noOfCards" to "number" as that is the valid HTML type
          required
          placeholder="Number of Cards"
          onChange={(e) => setNoOfCards(Number(e.target.value))}
        />

        {/* Increased button height to h-12 and text to text-md */}
        <Button
          className="w-full h-12 bg-black text-white hover:bg-gray-800 text-md font-semibold transition-all"
          onClick={Submit}
        >
          Submit Event
        </Button>
      </div>
    </div>
  );
}
