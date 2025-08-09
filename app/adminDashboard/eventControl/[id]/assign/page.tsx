import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Page = () => {
  return (
    <div className="w-full h-auto ">
      <div className="bg-gray-950 w-full h-20 flex items-center">
        <SidebarTrigger className="w-15 h-15 ml-3 text-white" />
        <div className="w-full text-white flex justify-center items-center text-xl pr-9">
          Admin setup
        </div>
      </div>

      <div className="max-w-sm mx-auto mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          number of guests
        </h2>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="event1">Event1</SelectItem>
            <SelectItem value="event2">Event2</SelectItem>
            <SelectItem value="event3">Event3</SelectItem>
            <SelectItem value="event4">Event4</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex w-full mt-10 max-w-sm items-center gap-2">
          <Input type="number" placeholder="number of guest" />
        </div>
        <Button type="submit" variant="outline" className="w-full mt-6">
          submit
        </Button>
      </div>
    </div>
  );
};

export default Page;
