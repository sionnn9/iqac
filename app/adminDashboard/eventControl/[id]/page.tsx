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
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";
import { DepartmentStore } from "@/app/store";

const AddDepartmentButton = () => {
  const Branch_id = useParams();
  const department = DepartmentStore();
  const [departmentName, setDepartmentName] = useState("");
  const param = useParams();

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
        console.log(data, ": department data");

        department.setDepartments(data.departments);
      }
    } catch (e) {
      console.log(e);
    }
  };
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
      console.log("Departments edited:", data);
      getDepartment();
    } catch (e) {
      console.error("Request failed:", e);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <div className=" w-full flex justify-center p-4">
          <button
            className="w-52 sm:w-56 h-52 sm:h-56 flex flex-col justify-center items-center 
                     bg-white rounded-2xl shadow-lg border-t-8 border-black 
                     transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <Plus size={32} />
            <h1 className="mt-4 sm:mt-6 font-semibold text-center text-sm sm:text-base">
              Add Department
            </h1>
          </button>
        </div>
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
  const [isClient, setisClient] = useState(false);
  const departmentstore = DepartmentStore();
  // Department Id SHould come from params
  const searchparam = useSearchParams();
  const BranchName = searchparam.get("branch");
  const param = useParams();
  // to get the department for edit
  const [editedName, setEditedName] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [departmentId, setDepartmentId] = useState("");

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
        console.log(data, ": department data");

        departmentstore.setDepartments(data.departments);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const editDepartment = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}updateDepartment/${departmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: editedName, branchId: param.id }),
        }
      );
      if (!responce.ok) {
        const data = await responce.text;
        console.log(data);
        alert("Failed to Edit");
        return;
      }
      const data = await responce.json();
      getDepartment();
      console.log("edited responce:", data);
    } catch (e) {
      console.log(e);
    }
  };

  {
    /*Semester year insertion request function */
  }

  const DeleteDepartment = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}deleteDepartment/${departmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!responce.ok) {
        const data = await responce.text();
        console.log(data);
        alert("Failed to Delete");
        return;
      }
      const data = await responce.json();
      alert("deleted Department");
      getDepartment();
      console.log("Deleted responce:", data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getDepartment();
    setisClient(true);
  }, []);

  if (!isClient) return <h1>Loading</h1>;
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
      <div className="p-4 flex flex-wrap justify-center items-start">
        {departmentstore.departments?.map((data, i) => (
          <div
            key={i}
            onClick={() =>
              (window.location.href = `./${param.id}/assign?id=${data._id}&department=${data.name}`)
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

            {/* Department Name */}
            <div className="text-center font-medium text-lg sm:text-lg md:text-base lg:text-lg pt-2 z-10 px-4 text-gray-800 break-words">
              {data.name}
            </div>

            {/* Semester Year */}
            {/* <div className="text-center text-sm sm:text-sm md:text-md pt-1 z-10 text-gray-600">
              {data.startYear && data.endYear
              ? `${data.startYear} - ${data.endYear}`
              : "No date set"}
            </div> */}

            {/* Edit & Delete Actions */}
            <div className="flex gap-2 mt-auto mb-4 px-3 w-full justify-center">
              {/* Edit Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      setDepartmentId(data._id);
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      editDepartment();
                    }}
                  >
                    <DialogHeader className="text-center flex flex-col items-center">
                      <DialogTitle>Edit Department</DialogTitle>
                      <DialogDescription>Update the name</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input
                          placeholder="New department name"
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-3 pt-5">
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          onChange={(e) => setStartYear(e.target.value)}
                        />
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          onChange={(e) => setEndYear(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          editDepartment();
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
                      setDepartmentId(data._id);
                    }}
                    className="bg-red-700 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                    <Trash2 size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent onClick={(e) => e.stopPropagation()}>
                  <DialogTitle>
                    Are you sure you want to delete {data.name} Department?
                  </DialogTitle>
                  <DialogFooter>
                    <DialogClose>
                      <Button
                        className="bg-red-800 px-4 py-2 rounded-lg text-white hover:bg-red-700"
                        onClick={() => DeleteDepartment()}
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
        <AddDepartmentButton />
      </div>
    </div>
  );
}
