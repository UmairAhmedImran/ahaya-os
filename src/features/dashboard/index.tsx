import { KpiCards } from "./components/kpi-cards"
import { RevenueChart } from "./components/revenue-chart"
import { PageHeader } from "./components/page-header"
import { RecentTransactions } from "./components/transactions/recent-transactions"

export function DashboardPage() {
  return (
    <div>
      <PageHeader />
      <KpiCards />
      <RevenueChart />
      <RecentTransactions />
    </div>
  )
}
