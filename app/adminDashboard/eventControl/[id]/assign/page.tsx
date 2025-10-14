"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState, ChangeEvent } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UseBranches, useBranchStore } from "@/app/store";

// ---------------- Add User Button Component ----------------
const Adduserbutton = () => {
  const searchparam = useSearchParams();
  const id = searchparam.get("id");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("user");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const addUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}addUser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
            department_id: id,
            role,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error:", await response.text());
        alert("Something went wrong");
        return;
      }

      const data = await response.json();
      console.log("User added:", data);
    } catch (e) {
      console.error("Request failed:", e);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="m-5 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg overflow-hidden  w-56 border-t-8 border-black border-l-0 border-r-0 border-b-0 h-56 flex flex-col justify-center items-center   bg-white rounded-2xl shadow border">
          <Plus />
          <h1 className="mt-9 font-bold">Add Admin/User</h1>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Gmail</AlertDialogTitle>
        </AlertDialogHeader>
        <input
          onChange={(e) => setemail(e.target.value)}
          placeholder="Gmail"
          required
          className="flex justify-center border-black p-2 items-center border rounded-xl h-10"
        />

        <AlertDialogHeader>
          <AlertDialogTitle>Password</AlertDialogTitle>
        </AlertDialogHeader>
        <input
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          required
          className="flex justify-center border-black p-2 items-center border rounded-xl h-10"
        />

        <AlertDialogHeader>
          <AlertDialogTitle>Role</AlertDialogTitle>
        </AlertDialogHeader>
        <select
          id="role"
          value={role}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={addUser}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// ---------------- Main Page Component ----------------
const Page = () => {
  /* mode,
      department,
      type,
      academic_year,
      phase,
      start_date,
      end_date,
      branchId,
      participants,*/
  const [mode, setmode] = useState("");

  const [type, settype] = useState("");
  const [academic_year, setacademic_year] = useState({ start: "", end: "" });
  const [phase, setphase] = useState("");
  const [start_date, setstart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [participants, setparticipants] = useState("");
  const searchparam = useSearchParams();
  const department = searchparam.get("department");
  const departmentId = searchparam.get("id");
  const [branchId, setBranchId] = useState<string>("");

  const { currentBranchId, setCurrentBranchId } = useBranchStore();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setUrl(window.location.href);
    console.log(url);
    setBranchId(url.split("/")[5]);
  }, [url]);

  // Assume you already stored branchId in Zustand store

  const handleSubmit = async () => {
    const payload = {
      mode,
      department: departmentId, // must match backend
      type: type,
      academic_year: `2025-2026`,
      phase: phase,
      start_date: start_date,
      end_date: end_date,
      branchId: branchId, // from Zustand
      participants,
    };

    console.log("Submitting Event:", payload);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}admin/assignEvent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log("Event Assigned Successfully:", data);
        alert("event added Succussfully");
      } else {
        console.error("Error Assigning Event:", data.message);
      }
    } catch (err) {
      console.error("Request Failed:", err);
    }
  };

  useEffect(() => {
    console.log(branchId);
  });

  return (
    <div className="w-full h-auto">
      {/* Top Bar */}
      <div className="bg-gray-950 w-full h-20 flex items-center">
        <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
        <div className="w-full text-white flex justify-center items-center text-xl pr-9">
          {department}
        </div>
      </div>

      {/* Tabs for Add User & Event Guests */}
      <Tabs defaultValue="add-user" className="w-full max-w-lg mx-auto mt-6">
        <TabsList className="w-full flex">
          <TabsTrigger value="add-user" className="flex-1">
            Add Admin/User
          </TabsTrigger>
          <TabsTrigger value="event-guests" className="flex-1">
            Event Guests
          </TabsTrigger>
        </TabsList>

        {/* Add User Tab */}
        <TabsContent value="add-user" className="mt-6 flex justify-center">
          <Adduserbutton />
        </TabsContent>

        {/* Event Guests Tab */}
        <TabsContent value="event-guests" className="mt-6">
          <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Number of Guests
            </h2>

            {/* Event Name */}
            <Select onValueChange={settype} required>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event1">Event1</SelectItem>
                <SelectItem value="event2">Event2</SelectItem>
                <SelectItem value="event3">Event3</SelectItem>
                <SelectItem value="event4">Event4</SelectItem>
              </SelectContent>
            </Select>

            {/* Type of Event */}
            <Select onValueChange={settype} required>
              <SelectTrigger className="w-full cursor-pointer mt-5">
                <SelectValue placeholder="Type of Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="guest lecture">Guest Lecture</SelectItem>
                <SelectItem value="competition">Competition</SelectItem>
              </SelectContent>
            </Select>

            {/* Mode of Event */}
            <Select onValueChange={setmode} required>
              <SelectTrigger className="w-full mt-5 cursor-pointer">
                <SelectValue placeholder="Mode of event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>

            {/* Phase */}
            <Select onValueChange={setphase} required>
              <SelectTrigger className="w-full mt-5 cursor-pointer">
                <SelectValue placeholder="Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Phase 1</SelectItem>
                <SelectItem value="2">Phase 2</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex w-full mt-5 max-w-sm items-center gap-2">
              {/* Start Year */}
              <Input
                type="date"
                placeholder="Start Year"
                className="w-full cursor-pointer"
                required
                onChange={(e) => {
                  setacademic_year((prev) => ({
                    ...prev,
                    start: e.target.value,
                  }));
                  setstart_date(e.target.value); // keep if backend needs it separately
                }}
              />

              <span className="text-gray-500">-</span>

              {/* End Year */}
              <Input
                type="date"
                required
                placeholder="End Year"
                className="w-full cursor-pointer"
                onChange={(e) => {
                  setacademic_year((prev) => ({
                    ...prev,
                    end: e.target.value,
                  }));
                  setEnd_date(e.target.value); // keep if backend needs it separately
                }}
              />
            </div>

            {/* Participants */}
            <div className="flex w-full mt-5 max-w-sm items-center gap-2 cursor-pointer">
              <Input
                type="number"
                placeholder="Number of guests"
                required
                onChange={(e) => setparticipants(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSubmit}
              type="button"
              variant="outline"
              className="w-full cursor-pointer bg-black text-white ease-out mt-6"
            >
              Submit
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
