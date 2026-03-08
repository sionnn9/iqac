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

type Props = { DepartmentId: string | null; BranchId: string | null };

export default function AssignEventCard({ DepartmentId, BranchId }: Props) {
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [phase, setPhase] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [participants, setParticipants] = useState<number | null>(0);
  const [academicYears, setAcademicYears] = useState<string[]>([]);
  const [academicYear, setAcademicYear] = useState<string>("");

  const getAcademicYears = (startYear = 2025, count = 6) => {
    return Array.from({ length: count }, (_, i) => {
      const y1 = startYear + i;
      const y2 = y1 + 1;
      return `${y1}-${y2}`;
    });
  };

  const validateDates = () => {
    if (!startDate || !endDate || !academicYear) {
      alert("Please fill in all date and year fields");
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // 1. Check if Start is before End
    if (start > end) {
      alert("Error: Start date cannot be after the end date.");
      return false;
    }

    // 2. Check if dates match the selected Academic Year
    // Split "2025-2026" into [2025, 2026]
    const [startYearLimit, endYearLimit] = academicYear.split("-").map(Number);
    const selectedStartYear = start.getFullYear();
    const selectedEndYear = end.getFullYear();

    if (selectedStartYear < startYearLimit || selectedEndYear > endYearLimit) {
      alert(
        `Error: Selected dates must be within the ${academicYear} academic year.`,
      );
      return false;
    }

    return true;
  };

  const Submit = async () => {
    // Run Validation
    if (!validateDates()) return;

    const payload = {
      department: DepartmentId,
      type: type,
      academic_year: academicYear,
      phase: phase,
      start_date: startDate,
      end_date: endDate,
      branchId: BranchId,
      participants: participants,
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
        alert("Event added successfully");
      } else {
        alert(data.message || "Error assigning event");
      }
    } catch (err) {
      console.error("Request Failed:", err);
      alert("Server connection failed");
    }
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = getAcademicYears(currentYear - 4, 7);
    setAcademicYears(years);
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Assign Event
      </h2>

      {/* Select inputs remain the same... */}
      <div className="space-y-4">
        <Select required onValueChange={setType}>
          <SelectTrigger className="w-full cursor-pointer">
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
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Mode of event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>

        <Select required onValueChange={setPhase}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Phase 1</SelectItem>
            <SelectItem value="2">Phase 2</SelectItem>
          </SelectContent>
        </Select>

        <Select required onValueChange={setAcademicYear}>
          <SelectTrigger className="w-full cursor-pointer">
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

        <div className="flex w-full items-center gap-2">
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-gray-400">
              Start
            </label>
            <Input
              type="date"
              required
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <span className="text-gray-500 mt-4">-</span>
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-gray-400">
              End
            </label>
            <Input
              type="date"
              required
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <Input
          type="number"
          required
          placeholder="Number of participants"
          onChange={(e) => setParticipants(Number(e.target.value))}
        />

        <Button
          className="w-full bg-black text-white hover:bg-gray-800"
          onClick={Submit}
        >
          Submit Event
        </Button>
      </div>
    </div>
  );
}
