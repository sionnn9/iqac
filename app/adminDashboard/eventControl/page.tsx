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
import { Plus, Trash2 } from "lucide-react";
import { UseBranches } from "@/app/store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

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
        <div className="w-full flex justify-center p-4">
          <button
            className="w-52 sm:w-56 h-52 sm:h-56 flex flex-col justify-center items-center 
                     bg-white rounded-2xl shadow-lg border-t-8 border-black 
                     transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <Plus size={32} />
            <h1 className="mt-4  sm:mt-6 font-semibold text-center text-sm sm:text-base">
              Add Branch
            </h1>
          </button>
        </div>
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
  const router = useRouter();
  const setBranches = UseBranches((state) => state.setBranches);
  const [newBranchName, setNewBranchName] = useState("");
  const [branchId, setBranchId] = useState("");

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
  const EditBranch = async () => {
    if (newBranchName.trim()[0] == "") {
      alert("No content added");
      return;
    }
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}updateBranch/${branchId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name: newBranchName }),
        }
      );
      if (!responce.ok) {
        alert(responce.text);
        return;
      }
      const data = await responce.json();
      console.log(data);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteBranch = async () => {
    if (newBranchName.trim()[0] == "") {
      alert("No content added");
      return;
    }
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}deleteBranch/${branchId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!responce.ok) {
        const responceerror = await responce.text();
        alert(responceerror);
        return;
      }
      const data = await responce.json();
      console.log(data);
      GetBranches();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    GetBranches();
    console.log(Branches);
  }, []);

  if (Branches?.names.length > 0) {
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
        {/* Card Grid */}
        <div className="p-4 flex flex-wrap justify-center items-start">
          {Branches?.names?.map((data, i) => (
            <div
              key={"names" + i}
              onClick={() =>
                (window.location.href = `/adminDashboard/eventControl/${data._id}?branch=${data.name}`)
              }
              className="relative w-56 sm:w-64 md:w-72 lg:w-64 m-3 min-h-[240px] bg-white shadow-lg rounded-2xl flex flex-col items-center justify-center 
         transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
            >
              {/* Red Strip */}
              <div className="absolute top-0 left-0 w-full h-2 bg-black rounded-t-2xl" />

              {/* Icon */}
              <div className="text-5xl text-blue-600 p-4 mt-4 rounded-full z-10">
                🎓
              </div>

              {/* College Name */}
              <div className="text-center font-medium text-sm sm:text-base md:text-base lg:text-lg pt-2 z-10 px-4 text-gray-800 break-words text-center">
                {data.name}
              </div>

              {/* Edit & Delete Actions */}
              <div className="flex gap-2 mt-auto mb-4 px-3 w-full justify-center">
                {/* Edit Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        setBranchId(data._id);
                      }}
                      className="px-3 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    onClick={(e) => e.stopPropagation()}
                    className="sm:max-w-[425px]"
                  >
                    <form>
                      <DialogHeader className="text-center flex flex-col items-center">
                        <DialogTitle>Edit Branch</DialogTitle>
                        <DialogDescription>Update the name</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label>Name</Label>
                          <Input
                            placeholder="New branch name"
                            onChange={(e) => setNewBranchName(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter className="mt-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          onClick={async (e) => {
                            e.stopPropagation(); // Extra safety
                            await EditBranch();
                            await GetBranches();
                          }}
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        setBranchId(data._id);
                      }}
                      className="bg-red-700 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent onClick={(e) => e.stopPropagation()}>
                    <DialogTitle>
                      Are you sure you want to delete {data.name} Branch?
                    </DialogTitle>
                    <DialogFooter>
                      <DialogClose>
                        <Button
                          className="bg-red-800 px-4 py-2 rounded-lg text-white hover:bg-red-700"
                          onClick={() => DeleteBranch()}
                        >
                          Yes
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
          <AddBranchButton />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full">
        <div className="bg-gray-950 w-full h-16 flex items-center px-4 sm:px-6">
          <SidebarTrigger className="text-white mr-4" />
          <h1 className="text-white text-lg sm:text-xl font-semibold flex-1 text-center sm:text-left pr-9">
            Collegess
          </h1>
        </div>
        <Skeleton className="w-full h-full m-7 rounded-xl" />
      </div>
    );
  }
}
