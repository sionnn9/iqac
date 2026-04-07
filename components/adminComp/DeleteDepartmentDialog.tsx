import React from "react";
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
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  name: string;
  _id: string;
  setDepartmentId: () => void;
  DeleteDepartment: () => void;
}
const DeleteDepartmentDialog = ({
  name,
  _id,
  setDepartmentId,
  DeleteDepartment,
}: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              setDepartmentId();
            }}
            className="bg-red-700 text-white px-3 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
            <Trash2 size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogTitle>
            Are you sure you want to delete {name} Department?
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
  );
};

export default DeleteDepartmentDialog;
