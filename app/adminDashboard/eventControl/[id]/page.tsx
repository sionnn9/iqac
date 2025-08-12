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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";

const AddDepartmentButton = () => {
  const Branch_id = useParams();
  const [departmentName, setDepartmentName] = useState("");

  // fetching all the departments in the Branch
  const AddDepartment = async () => {
    try {
      if (departmentName == "") {
        alert("input empty");
        return;
      }
      console.log(`${process.env.NEXT_PUBLIC_BACKEND_LINK}addDepartment`);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}addDepartment`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: departmentName,
            branchId: Branch_id.id,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Departments:", data);
    } catch (e) {
      console.error("Request failed:", e);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <button className="m-5 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg overflow-hidden  w-56 border-t-8 border-black border-l-0 border-r-0 border-b-0 h-56 flex flex-col justify-center items-center   bg-white rounded-2xl shadow border">
          <Plus />
          <h1 className="mt-9 font-bold">Add Department</h1>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Name Of the Department</AlertDialogTitle>
        </AlertDialogHeader>
        <input
          onChange={(e) => {
            setDepartmentName(e.target.value);
          }}
          placeholder="Department"
          className="flex justify-center border-black p-2 items-center border  rounded-xl h-10 "
        />

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              console.log(departmentName, Branch_id);
              AddDepartment();
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
  // Department Id SHould come from params
  const searchparam = useSearchParams();
  const BranchName = searchparam.get("branch");
  const param = useParams();
  const [departments, setdepartments] =
    useState<{ name: string; _id: string }[]>();

  const getDepartment = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}getAllDepartments?branchId=${param.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!responce.ok) {
        console.log("error");
        const data = await responce.text();
        console.log(data);
      } else {
        console.log("success");
        const data = await responce.json();
        console.log(data);
        setdepartments(data.departments);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getDepartment();
  }, []);
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-950 w-full h-16 flex items-center px-4 sm:px-6">
        <SidebarTrigger className="text-white mr-4" />
        <h1 className="text-white text-lg sm:text-xl font-semibold flex-1 text-center sm:text-left pr-9">
          Courses in {BranchName}
        </h1>
      </div>

      {/* Card Grid */}
      {departments?.map((data, i) => {
        return (
          <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <button
              className="relative w-full aspect-square bg-white shadow-md rounded-xl flex flex-col items-center justify-center gap-4 
                       transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg overflow-hidden"
            >
              {/* Red Strip with Rounded Top Corners */}
              <div className="absolute top-0 left-0 w-full h-2 bg-black rounded-t-xl" />

              {/* Icon */}
              <div className="text-4xl  text-blue-700 p-4 rounded-full z-10">
                🎓
              </div>

              {/* College Name */}
              <div className="text-center font-bold text-lg sm:text-lg pt-3 z-10">
                {data.name}
              </div>
              <div className="flex gap-2 mt-3">
                <Link
                  href={`./${param.id}/assign?id=${data._id}&department=${data.name}`}
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
            </button>
          </div>
        );
      })}
      <AddDepartmentButton />
    </div>
  );
}
