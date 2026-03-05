"use client";
import AddDepartmentButton from "@/components/adminComp/AddDepartmentButton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DepartmentStore } from "@/app/store";

import AddSemisterDates from "@/components/adminComp/Addsemister";
import DeleteDepartmentDialog from "@/components/adminComp/DeleteDepartmentDialog";
import EditDepartmentDialog from "@/components/adminComp/EditDepartmentDialog";

// Shadcn Tabs Imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const [isClient, setisClient] = useState(false);
  const departmentstore = DepartmentStore();
  const searchparam = useSearchParams();
  const BranchName = searchparam.get("branch");
  const param = useParams();

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
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      if (responce.ok) {
        const data = await responce.json();
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: editedName, branchId: param.id }),
        },
      );
      if (!responce.ok) {
        alert("Failed to Edit");
        return;
      }
      getDepartment();
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
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!responce.ok) {
        alert("Failed to Delete");
        return;
      }
      alert("deleted Department");
      getDepartment();
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

      <div className="p-4">
        <Tabs defaultValue="view" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="view">Departments</TabsTrigger>
            <TabsTrigger value="dates">Set Semester Dates</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            {/* Card Grid - Your Original Styling */}
            <div className="flex flex-wrap justify-center items-start">
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

                  {/* Edit & Delete Actions */}
                  <div
                    className="flex gap-2 mt-auto mb-4 px-3 w-full justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditDepartmentDialog
                      departmentId={data._id}
                      setDepartmentId={setDepartmentId}
                      setEditedName={setEditedName}
                      setStartYear={setStartYear}
                      setEndYear={setEndYear}
                      editDepartment={() => editDepartment()}
                    />

                    <DeleteDepartmentDialog
                      name={data.name}
                      _id={data._id}
                      setDepartmentId={() => setDepartmentId(data._id)}
                      DeleteDepartment={() => DeleteDepartment()}
                    />
                  </div>
                </div>
              ))}
              <AddDepartmentButton />
            </div>
          </TabsContent>

          <TabsContent value="dates">
            <div className=" p-6  max-w-xl mx-auto">
              <AddSemisterDates DepartmentId={searchparam.get("id")} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
