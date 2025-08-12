"use client";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus } from "lucide-react";
import { UseBranches } from "@/app/store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import Link from "next/link";

const AddBranchButton = () => {
  const [name, setname] = useState("");
  const setBranches = UseBranches((state) => state.setBranches);

  const GetBranches = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}getBranch`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (responce.ok) {
        const data = await responce.json();
        setBranches(data?.branches);
      } else {
        console.log("Error fetching branches");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const AddBranches = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}addBranch`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name }),
        }
      );
      if (responce.ok) {
        await responce.json();
        GetBranches();
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="w-56 m-5 border-t-8 border-black border-l-0 border-r-0 border-b-0 h-56 flex flex-col justify-center items-center bg-white rounded-2xl shadow border">
          <Plus />
          <h1 className="mt-9 font-bold">Add Branch</h1>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Name Of The Branch</AlertDialogTitle>
        </AlertDialogHeader>
        <input
          onChange={(e) => setname(e.target.value)}
          placeholder="Department"
          className="flex justify-center border-black p-2 items-center border rounded-xl h-10"
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={AddBranches}>Continue</AlertDialogAction>
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
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}getBranch`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (responce.ok) {
        const data = await responce.json();
        setBranches(data?.branches);
      } else {
        console.log("Error fetching branches");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    GetBranches();
  }, []);

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
          <div
            key={"names" + i}
            className="relative w-56 m-3 h-56 bg-white shadow-md rounded-xl flex flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg overflow-hidden"
          >
            {/* Red Strip */}
            <div className="absolute top-0 left-0 w-full h-2 bg-black rounded-t-xl" />

            {/* Icon */}
            <div className="text-4xl text-blue-700 p-4 rounded-full z-10">
              🎓
            </div>

            {/* College Name */}
            <div className="text-center font-bold text-lg sm:text-lg pt-3 z-10">
              {data.name}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <Link
                href={`/adminDashboard/eventControl/${data._id}?branch=${data.name}`}
                className="px-2 py-1.5 bg-green-600 font-bold text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Open
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form>
                    <DialogHeader className="text-center flex flex-col items-center">
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>Update the name</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      {[["name", "Name", "text"]].map(([id, label, type]) => (
                        <div key={id} className="grid gap-3">
                          <Label htmlFor={id}>{label}</Label>
                          <Input
                            id={id}
                            name={id}
                            type={type}
                            placeholder={label}
                          />
                        </div>
                      ))}
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
            </div>
          </div>
        ))}
        <AddBranchButton />
      </div>
    </div>
  );
}
