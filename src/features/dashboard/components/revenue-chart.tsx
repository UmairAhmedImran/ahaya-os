import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { day: "Mon", current: 186, previous: 80 },
  { day: "Tue", current: 305, previous: 200 },
  { day: "Wed", current: 237, previous: 120 },
  { day: "Thu", current: 73, previous: 190 },
  { day: "Fri", current: 209, previous: 130 },
  { day: "Sat", current: 214, previous: 140 },
  { day: "Sun", current: 114, previous: 140 },
]

const chartConfig = {
  current: {
    label: "Current",
    color: "var(--primary)",
  },
  previous: {
    label: "Previous",
    color: "var(--sidebar-accent)",
  },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <div className="mt-12 w-full px-4">
      <div className="flex flex-col lg:flex-row gap-6">

        <div className="w-full lg:w-2/3">
          <div className="rounded-xl border p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold">Revenue Growth</h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-[#3730a3]" />
                  Current
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full border border-indigo-200 bg-[#eef2ff]" />
                  Previous
                </span>
              </div>
            </div>
            <ChartContainer
              config={chartConfig}
              className="w-full h-[250px] sm:h-[300px] lg:h-[350px]"
            >
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <Bar dataKey="current" stackId="a" fill="#3730a3" />
                <Bar dataKey="previous" stackId="a" fill="#eef2ff" />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="flex h-full flex-col justify-between rounded-2xl bg-[#3730a3] p-6">
            <div className="flex flex-col gap-4">
              <span className="w-fit rounded-md bg-indigo-800 px-3 py-1 text-xs font-semibold text-indigo-200 uppercase">
                New Insights
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Machine learning detected a 14% anomaly in User Retention.
              </h3>
              <p className="text-sm text-indigo-200">
                Most active users are coming from Central Europe. Would you
                like to optimize servers for that region?
              </p>
            </div>
            <button className="mt-6 w-full rounded-xl bg-white py-3 font-bold text-[#3730a3] hover:bg-indigo-50">
              Investigate Now
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
