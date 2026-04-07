"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface Prop {
  departmentId: string | null;
}

export default function CSVButton({ departmentId }: Prop) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}admin/generateEventCSV?departmentId=${departmentId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) throw new Error("Download failed");

      // Create a blob from the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a hidden link and click it
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "events-report.csv");
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export Error:", error);
      toast.error("Failed to download CSV.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      className="px-4 py-2"
    >
      {isDownloading ? "Generating CSV..." : "Download Event CSV"}
    </Button>
  );
}
