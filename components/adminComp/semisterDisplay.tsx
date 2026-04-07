import React from "react";
import { CalendarDays, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface SemesterProps {
  start: string | Date;
  end: string | Date;
}

export default function CurrentSemesterStatus({ start, end }: SemesterProps) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const today = new Date();

  // Calculate Progress Percentage
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsed = today.getTime() - startDate.getTime();
  const progress = Math.min(
    Math.max(Math.round((elapsed / totalDuration) * 100), 0),
    100,
  );

  // Formatting dates for display
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <Card className="w-full max-w-md bg-white border-t-4 border-black">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Current Semester
          </CardTitle>
          <Badge
            variant={progress === 100 ? "secondary" : "default"}
            className="bg-blue-100 text-blue-700 hover:bg-blue-100"
          >
            {progress}% Complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-xs font-medium">
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 uppercase tracking-wider">
              Start
            </span>
            <div className="flex items-center gap-1 text-gray-700">
              <CalendarDays className="w-3 h-3" />
              {formatDate(startDate)}
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-gray-400 uppercase tracking-wider">End</span>
            <div className="flex items-center gap-1 text-gray-700 justify-end">
              {formatDate(endDate)}
              <CalendarDays className="w-3 h-3" />
            </div>
          </div>
        </div>

        {today > endDate ? (
          <p className="text-center text-xs text-red-500 font-medium">
            Semester has ended
          </p>
        ) : (
          <p className="text-center text-xs text-gray-500 italic">
            Ongoing Academic Session
          </p>
        )}
      </CardContent>
    </Card>
  );
}
