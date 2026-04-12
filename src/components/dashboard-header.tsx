import { Calendar, Download } from "lucide-react";
import { Button } from "./ui/button.tsx";

export function DashboardHeader() {
  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-3xl pt-6 pb-2">Executive Summary</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3">
        <p className="font-light text-sm">Deep dive into this moth&apos;s curated performance metrics.</p>
        <div className="flex justify-start gap-x-2">
          <Button variant="outline" className="w-36 font-light"><Calendar className="size-3" />Last 30 Days</Button>
          <Button className="w-28 font-light"><Download className="size-3" />Export</Button>
        </div>
      </div>
    </div>
  )
}
