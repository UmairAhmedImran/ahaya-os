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

export function ChartBarStacked() {
  return (
    <div className="mt-12 flex w-full flex-col pr-8 gap-y-8 sm:flex-row sm:gap-x-10 ">
      <div className="w-full sm:flex-1">
        <div className="rounded-xl border p-6">
          <div className="mb-4 flex items-start justify-between sm:items-center">
            <h2 className="text-lg leading-tight font-semibold">
              Revenue Growth
            </h2>
            <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-x-1">
                <span className="inline-block size-2 rounded-full bg-[#3730a3]" />
                Current
              </span>
              <span className="flex items-center gap-x-1">
                <span className="inline-block size-2 rounded-full border border-indigo-200 bg-[#eef2ff]" />
                Previous
              </span>
            </div>
          </div>

          <ChartContainer config={chartConfig} className="h-72 w-full">
            <BarChart accessibilityLayer data={chartData} barCategoryGap="10%">
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <Bar
                dataKey="current"
                stackId="a"
                fill="#3730a3"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="previous"
                stackId="a"
                fill="#eef2ff"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col justify-between rounded-2xl bg-[#3730a3] p-6 sm:w-80">
        <div className="flex flex-col gap-y-4">
          <span className="w-fit rounded-md bg-indigo-800 px-3 py-1 text-xs font-semibold tracking-widest text-indigo-200 uppercase">
            New Insights
          </span>

          <h3 className="text-2xl leading-snug font-bold text-white">
            Machine learning detected a 14% anomaly in User Retention.
          </h3>

          <p className="text-sm text-indigo-200">
            Most active users are coming from Central Europe. Would you like to
            optimize servers for that region?
          </p>
        </div>

        <button className="mt-6 w-full rounded-xl bg-white py-3 font-bold text-[#3730a3] transition-colors hover:bg-indigo-50">
          Investigate Now
        </button>
      </div>
    </div>
  )
}
