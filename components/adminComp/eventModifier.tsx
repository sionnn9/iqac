import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EventType {
  _id: string;
  eventName: string;
  departmentId: string;
}

interface Props {
  departmentId: string;
  baseUrl1: string;
}

const EventManager = ({ departmentId }: { departmentId: string | null }) => {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [newEventName, setNewEventName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // 1. GET ALL
  const fetchEventTypes = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}admin/getAllEventTypes?departmentId=${departmentId}`,
      );
      const data = await res.json();
      console.log(data.data);
      setEventTypes(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 2. POST - Create Event
  const createEventType = async () => {
    if (!newEventName.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}admin/createEventType`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventName: newEventName,
            departmentId: departmentId,
          }),
        },
      );

      if (res.ok) {
        setNewEventName(""); // Clear input
        setOpen(false); // Close Dialog
        fetchEventTypes(); // Refresh list
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. DELETE
  const deleteEventType = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}admin/deleteEventType?eventTypeId=${id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        setEventTypes((prev) => prev.filter((e) => e._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (departmentId) fetchEventTypes();
  }, [departmentId]);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Department Events
        </h2>

        {/* --- SHADCN DIALOG POPUP --- */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Add New Event</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Event Type</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Name</label>
                <Input
                  placeholder="e.g. Tech Talk"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createEventType}>Create Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* --- LIST TABLE --- */}
      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : eventTypes.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-4 text-center text-slate-400">
                  No events found.
                </td>
              </tr>
            ) : (
              eventTypes.map((event) => (
                <tr key={event._id} className="border-b hover:bg-slate-50/50">
                  <td className="p-3 font-medium">{event.eventName}</td>
                  <td className="p-3 text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteEventType(event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManager;
