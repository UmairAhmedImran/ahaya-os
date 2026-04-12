import { DashboardCard } from "./dashboard-card";
import { ChartBarStacked } from "./dashboard-chart";
import { DashboardHeader } from "./dashboard-header";

export function DashboardPage() {
  return (
    <div className="">
      <DashboardHeader />
      <DashboardCard />
      <ChartBarStacked />
    </div>
  )
}
