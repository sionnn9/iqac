"use client";
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
import { Plus } from "lucide-react";
import { UseBranches } from "@/app/store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import Link from "next/link";
const AddBranchButton = () => {
  const [name, setname] = useState("");
  const Branches = UseBranches();
  const setBranches = UseBranches((state) => state.setBranches);

  const GetBranches = async () => {
    try {
      // console.log("backend link:", process.env.NEXT_PUBLIC_BACKEND_LINK);
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}getBranch`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!responce.ok) {
        const text = await responce.json();
        console.log("error", text || "No response body");
      } else {
        const data = await responce.json();
        //console.log(data?.branches, ": my branches");
        setBranches(data?.branches);
        // console.log(Branches);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const AddBranches = async () => {
    try {
      //console.log("backend link:", process.env.NEXT_PUBLIC_BACKEND_LINK);
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}addBranch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: name,
          }),
        }
      );
      if (!responce.ok) {
        const text = await responce.json();
        console.log("error", text || "No response body");
        alert("somthing went wrong");
      } else {
        const data = await responce.json();
        //console.log(data);
        GetBranches();
      }
    } catch (e) {
      //console.log(e);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <button className="w-56 m-5 border-t-8 border-black border-l-0 border-r-0 border-b-0 h-56 flex flex-col justify-center items-center   bg-white rounded-2xl shadow border">
          <Plus />
          <h1 className="mt-9 font-bold">Add Branch</h1>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Name Of The Branch</AlertDialogTitle>
        </AlertDialogHeader>
        <input
          onChange={(e) => {
            setname(e.target.value);
          }}
          placeholder="Department"
          className="flex justify-center border-black p-2 items-center border  rounded-xl h-10 "
        />

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              AddBranches();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default function Page() {
  const Branches = UseBranches();
  const setBranches = UseBranches((state) => state.setBranches);

  const GetBranches = async () => {
    try {
      // console.log("backend link:", process.env.NEXT_PUBLIC_BACKEND_LINK);
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}getBranch`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!responce.ok) {
        const text = await responce.json();
        console.log("error", text || "No response body");
      } else {
        const data = await responce.json();
        // console.log(data?.branches, ": my branches");
        setBranches(data?.branches);
        // console.log(Branches);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    GetBranches();
  }, []);
  useEffect(() => {
    GetBranches();
  }, [setBranches]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-950 w-full h-16 flex items-center px-4 sm:px-6">
        <SidebarTrigger className="text-white mr-4" />
        <h1 className="text-white text-lg sm:text-xl font-semibold flex-1 text-center sm:text-left pr-9">
          Collegess
        </h1>
      </div>

      {/* Card Grid */}
      <div className="p-4 flex flex-wrap justify-center items-center">
        {Branches?.names?.map((data, i) => (
          <Link
            key={"names" + i}
            href={`/adminDashboard/eventControl/${data._id}?branch=${data.name}`}
            className="relative w-56 m-3  h-56   bg-white shadow-md rounded-xl flex flex-col items-center justify-center 
                 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg overflow-hidden"
          >
            {/* Red Strip with Rounded Top Corners */}
            <div className="absolute top-0 left-0 w-full h-2 bg-black rounded-t-xl" />

            {/* Icon */}
            <div className="text-4xl text-blue-700 p-4 rounded-full z-10">
              🎓
            </div>

            {/* College Name */}
            <div className="text-center font-bold text-lg sm:text-lg pt-3 z-10">
              {data.name}
            </div>
          </Link>
        ))}
        <AddBranchButton />
      </div>
    </div>
  );
}
