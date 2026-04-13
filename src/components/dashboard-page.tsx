import { DashboardCard } from "./dashboard-card";
import { ChartBarStacked } from "./dashboard-chart";
import { DashboardHeader } from "./dashboard-header";
import DashboardRecentActivites from "./data-table-transaction/dashboard-recent-activities-table";

export function DashboardPage() {
  return (
    <div className="">
      <DashboardHeader />
      <DashboardCard />
      <ChartBarStacked />
      <DashboardRecentActivites />
    </div>
  )
}
