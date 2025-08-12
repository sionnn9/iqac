"use client";
import React, { useEffect } from "react";
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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, ChangeEvent } from "react";
const Adduserbutton = () => {
  const searchparam = useSearchParams();
  const id = searchparam.get("id");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("user"); // default value

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };
  useEffect(() => {
    console.log("aa:", id);
  }, []);

  const addUser = async () => {
    try {
      //console.log("backend link:", process.env.NEXT_PUBLIC_BACKEND_LINK);
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}addUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
            department_id: id,
            role: role,
          }),
        }
      );
      if (!responce.ok) {
        const text = await responce.json();
        console.log("error", text || "No response body");
        alert("somthing went wrong");
      } else {
        const data = await responce.json();
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <button className="w-56 m-5 border-t-8 border-black border-l-0 border-r-0 border-b-0 h-56 flex flex-col justify-center items-center   bg-white rounded-2xl shadow border">
          <Plus />
          <h1 className="mt-9 font-bold">Add Users</h1>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Gmail of the User</AlertDialogTitle>
        </AlertDialogHeader>
        <input
          onChange={(e) => {
            setemail(e.target.value);
          }}
          placeholder="Gmail"
          className="flex justify-center border-black p-2 items-center border  rounded-xl h-10 "
        />
        <AlertDialogHeader>
          <AlertDialogTitle>Password</AlertDialogTitle>
        </AlertDialogHeader>
        <input
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          placeholder="Password"
          className="flex justify-center border-black p-2 items-center border  rounded-xl h-10 "
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
          <AlertDialogAction
            onClick={() => {
              addUser();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
const Page = () => {
  const searchparam = useSearchParams();
  const department = searchparam.get("department");
  return (
    <div className="w-full h-auto ">
      <div className="bg-gray-950 w-full h-20 flex items-center">
        <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
        <div className="w-full text-white flex justify-center items-center text-xl pr-9">
          {department}
        </div>
      </div>

      <div className="max-w-sm mx-auto mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          number of guests
        </h2>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="event1">Event1</SelectItem>
            <SelectItem value="event2">Event2</SelectItem>
            <SelectItem value="event3">Event3</SelectItem>
            <SelectItem value="event4">Event4</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex w-full my-5 max-w-sm items-center gap-2">
          <Input type="text" placeholder="mode of event" />
        </div>
        <div className="flex w-full mt-5 max-w-sm items-center gap-2">
          <Input type="number" placeholder="number of guest" />
        </div>
        <Button type="submit" variant="outline" className="w-full mt-6">
          submit
        </Button>
      </div>
      <Adduserbutton />
    </div>
  );
};

export default Page;
