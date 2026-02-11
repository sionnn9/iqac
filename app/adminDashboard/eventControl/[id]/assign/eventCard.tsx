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

export default function EventCard({ DepartmentId, BranchId }: Props) {
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [phase, setPhase] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [participants, setParticipants] = useState<number | null>(0);
  const [eventName, setEventName] = useState("");
  const [academicYears, setAcademicYears] = useState([""]);
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
      start_date: startDate,
      end_date: endDate,
      branchId: BranchId,
      participants: 100,
      mode: mode,
    };

    console.log("Submitting Event:", payload);

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
        console.log("Event Assigned Successfully:", data);
        alert("event added Succussfully");
      } else {
        console.error("Error Assigning Event:", data.message);
        alert(data.message);
      }
    } catch (err) {
      console.error("Request Failed:", err);
    }
  };

  const setYears = () => {
    const currentYear = new Date().getFullYear();
    const years = getAcademicYears(currentYear - 4, 7);

    console.log("Generated years:", years); // ✅ should log
    setAcademicYears(years);
  };

  useEffect(() => {
    setYears();
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Event
      </h2>
      <Input
        type="text"
        required
        placeholder="Enter the event name"
        onChange={(e) => setEventName(e.target.value)}
      />

      {/* Type */}
      <Select required onValueChange={setType}>
        <SelectTrigger className="w-full mt-5 cursor-pointer">
          <SelectValue placeholder="Type of Event" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="seminar">Seminar</SelectItem>
          <SelectItem value="workshop">Workshop</SelectItem>
          <SelectItem value="guest lecture">Guest Lecture</SelectItem>
          <SelectItem value="competition">Competition</SelectItem>
        </SelectContent>
      </Select>

      {/* Mode */}
      <Select required onValueChange={setMode}>
        <SelectTrigger className="w-full mt-5 cursor-pointer">
          <SelectValue placeholder="Mode of event" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="online">Online</SelectItem>
          <SelectItem value="offline">Offline</SelectItem>
        </SelectContent>
      </Select>

      <Select required onValueChange={setPhase}>
        <SelectTrigger className="w-full mt-5 cursor-pointer">
          <SelectValue placeholder="Phase" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Phase 1</SelectItem>
          <SelectItem value="2">Phase 2</SelectItem>
        </SelectContent>
      </Select>

      <Select required onValueChange={setAcademicYear}>
        <SelectTrigger className="w-full mt-5 cursor-pointer">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {academicYears.map((year: string) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Dates */}
      <div className="flex w-full mt-5 items-center gap-2">
        <Input
          type="date"
          required
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span className="text-gray-500">-</span>
        <Input
          type="date"
          required
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Participants */}
      <Input
        className="mt-5"
        type="number"
        required
        placeholder="Number of guests"
        onChange={(e) => setParticipants(Number(e.target.value))}
      />

      <Button
        className="w-full mt-6 bg-black text-white"
        onClick={() => Submit()}
      >
        Submit
      </Button>
    </div>
  );
}
