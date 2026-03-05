import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  departmentId: string;
  setDepartmentId: (id: string) => void;
  setEditedName: (name: string) => void;
  setStartYear: (date: string) => void;
  setEndYear: (date: string) => void;
  editDepartment: () => void;
};

const EditDepartmentDialog: React.FC<Props> = ({
  departmentId,
  setDepartmentId,
  setEditedName,
  setStartYear,
  setEndYear,
  editDepartment,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setDepartmentId(departmentId);
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
              <Input type="date" onChange={(e) => setEndYear(e.target.value)} />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="submit"
                onClick={(e) => {
                  e.stopPropagation();
                  editDepartment();
                }}
              >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDepartmentDialog;
