import EventsAdmin from "@/components/adminComp/allEvents";
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
import { useParams } from "next/navigation";
import { useState } from "react";
import { DepartmentStore } from "@/app/store";

import { Plus } from "lucide-react";

export default function AddDepartmentButton() {
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
        },
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
        },
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
}
