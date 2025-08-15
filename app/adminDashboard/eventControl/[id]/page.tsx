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
  const [isClient, setisClient] = useState(false);
  const departmentstore = DepartmentStore();
  // Department Id SHould come from params
  const searchparam = useSearchParams();
  const BranchName = searchparam.get("branch");
  const param = useParams();
  // to get the department for edit
  const [editedName, setEditedName] = useState("");
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
      {departmentstore.departments?.map((data, i) => {
        return (
          <div
            key={i}
            className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            <div
              className="relative w-full aspect-square bg-white shadow-md rounded-xl flex flex-col items-center justify-center gap-4 
                 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg overflow-hidden"
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
              <div className="flex gap-2 mt-3">
                <Link
                  href={`./${param.id}/assign?id=${data._id}&department=${data.name}`}
                  className="px-2 py-1.5 bg-gray-800 font-bold text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  Open
                </Link>

                {/* Edit Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="px-3 py-1 bg-blue-900 text-white rounded-lg hover:bg-blue-700 text-sm"
                      onClick={() => {
                        setDepartmentId(data._id);
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        editDepartment();
                      }}
                    >
                      <DialogHeader className="text-center flex flex-col items-center">
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>Update the name</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div key={"name"} className="grid gap-3">
                          <Label htmlFor={"name"}>{"Name"}</Label>
                          <Input
                            id={"name"}
                            name={"name"}
                            type={"text"}
                            placeholder={"Name"}
                            onChange={(e) => {
                              setEditedName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <DialogFooter className="mt-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button type="submit">Save changes</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Deleting Department */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="px-3 py-1 bg-red-900 text-white rounded-lg hover:bg-red-700 text-sm"
                      onClick={() => {
                        setDepartmentId(data._id);
                      }}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <DialogHeader className="text-center flex flex-col items-center">
                        <DialogTitle>Delete Department? </DialogTitle>
                      </DialogHeader>

                      <DialogFooter className="mt-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            type="submit"
                            className="bg-red-800"
                            onClick={() => {
                              DeleteDepartment();
                            }}
                          >
                            confirm
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        );
      })}
      <AddDepartmentButton />
    </div>
  );
}
