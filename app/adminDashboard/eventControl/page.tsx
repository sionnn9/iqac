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
  const router = useRouter();
  const setBranches = UseBranches((state) => state.setBranches);
  const [newBranchName, setNewBranchName] = useState("");
  const { branchId } = UseBranches();
  const setBranchId = UseBranches((state) => state.setBranchId);

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
    console.log("f:", branchId);
  }, [branchId]);

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
                <Button
                  onClick={() => {
                    setBranchId(data._id);
                    console.log("f:", branchId);
                    router.push(
                      `/adminDashboard/eventControl/${data._id}?branch=${data.name}`
                    );
                  }}
                  className="px-2 py-1.5 bg-gray-800 font-bold text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  Open
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={(e) => {
                        setBranchId(data._id);

                        console.log("f:", branchId);
                      }}
                      className="px-3 py-1 bg-blue-900 text-white rounded-lg hover:bg-blue-700 text-sm"
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
                        <div className="grid gap-3">
                          <Label>{"Name"}</Label>
                          <Input
                            placeholder={"text"}
                            onChange={(e) => {
                              setNewBranchName(e.target.value);
                            }}
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

                <Dialog>
                  <DialogTrigger>
                    <Button
                      className="bg-black"
                      onClick={(e) => {
                        setBranchId(data._id);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>
                      Are you sure you want to delete {data.name} Branch
                    </DialogTitle>
                    <DialogFooter>
                      <DialogClose>
                        <Button
                          className="bg-red-800"
                          onClick={() => {
                            DeleteBranch();
                          }}
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
