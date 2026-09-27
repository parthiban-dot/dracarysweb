"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportButtonProps {
  data: any[];
  filename: string;
}

export function ExportCsvButton({ data, filename }: ExportButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        headers.map(header => {
          let val = row[header];
          if (val === null || val === undefined) val = "";
          if (Array.isArray(val)) val = val.join(" | ");
          if (typeof val === "object") val = JSON.stringify(val);
          return `"${String(val).replace(/"/g, '""')}"`;
        }).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      onClick={handleExport}
      variant="outline" 
      size="sm"
      className="border-primary/20 hover:bg-primary/10 text-primary transition-all"
    >
      <Download className="w-4 h-4 mr-2" />
      Export CSV
    </Button>
  );
}