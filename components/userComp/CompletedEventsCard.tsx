"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Standard shadcn button
import { CheckCircle2, Clock, Edit2, Layers, MapPin } from "lucide-react";

interface WorkshopCardProps {
  mode: string;
  type: string;
  completed: boolean;
  description: string;
  level: number;
  title: string;
  onEdit?: () => void; // New prop for handling the edit action
}

export default function CompletedEvent({
  mode,
  type,
  completed,
  description,
  level,
  title,
  onEdit,
}: WorkshopCardProps) {
  const getLevelColor = (lvl: number) => {
    if (lvl <= 2) return "bg-blue-50 text-blue-700 border-blue-200";
    if (lvl <= 4) return "bg-orange-50 text-orange-700 border-orange-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <div className="flex justify-center p-6">
      <Card className="group relative w-full max-w-xl overflow-hidden rounded-2xl border-muted/60 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
        {/* Edit Button - Absolute positioned for a clean look */}
        <div className="absolute right-4 top-4 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground shadow-sm"
          >
            <Edit2 size={14} />
            <span className="sr-only">Edit {title}</span>
          </Button>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between pr-8">
            {" "}
            {/* Added padding-right so text doesn't hit the button */}
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight text-foreground/90">
                {title}
              </CardTitle>

              <div className="flex flex-wrap gap-2 pt-1">
                <Badge
                  variant={completed ? "default" : "secondary"}
                  className="flex items-center gap-1 px-2.5 py-0.5"
                >
                  {completed ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {completed ? "Completed" : "In Progress"}
                </Badge>

                <Badge
                  variant="outline"
                  className={`flex items-center gap-1 border ${getLevelColor(level)}`}
                >
                  <Layers size={12} />
                  Level {level}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-muted/40">
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground/80">
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-primary/60" />
                <span className="capitalize">{mode}</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
              <span className="uppercase tracking-wider text-[10px] font-bold">
                {type}
              </span>
            </div>

            {/* Optional: Visual cue for interactivity */}
            <span className="text-[10px] text-muted-foreground italic opacity-0 group-hover:opacity-100 transition-opacity">
              Click edit to modify
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
