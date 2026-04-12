import { Calendar, Download } from "lucide-react"
import { Button } from "./ui/button.tsx"

export function DashboardHeader() {
  return (
    <div className="flex flex-col px-4 pt-6">
      <h1 className="text-2xl sm:text-3xl font-semibold pb-2">
        Executive Summary
      </h1>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-light text-muted-foreground max-w-md">
          Deep dive into this month&apos;s curated performance metrics.
        </p>
        <div className="flex flex-row gap-2 w-full sm:w-auto sm:flex-row sm:items-center sm:gap-2">

          <Button
            variant="outline"
            className="w-32 sm:w-auto flex items-center justify-center gap-2 font-light"
          >
            <Calendar className="size-4" />
            Last 30 Days
          </Button>

          <Button
            className="w-28 sm:w-auto flex items-center justify-center gap-2 font-light"
          >
            <Download className="size-4" />
            Export
          </Button>

        </div>
      </div>
    </div>
  )
}
