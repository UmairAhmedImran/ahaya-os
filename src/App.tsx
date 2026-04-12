import { Route, Routes } from "react-router-dom"
import HomeLayout from "./pages/home-layout"
import { DashboardPage } from "@/components/dashboard-page"
import { AnalyticsPage } from "@/components/analytics-page"
import { ReportPage } from "@/components/report-page"
import { UserPage } from "@/components/user-page"
import { SettingsPage } from "@/components/settings-page"

export function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
