"use client";

import React, { useState } from "react";

export default function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(
        "/api/admin/generateEventCSV?departmentId=68d37ca6242d51d89f715555",
        {
          method: "GET",
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
      alert("Failed to download CSV.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      {isDownloading ? "Generating CSV..." : "Download Event CSV"}
    </button>
  );
}
