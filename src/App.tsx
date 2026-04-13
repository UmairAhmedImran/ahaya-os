import { Route, Routes } from "react-router-dom"
import RootLayout from "./pages/root-layout"
import { DashboardPage } from "@/features/dashboard"
import { AnalyticsPage } from "@/features/analytics"
import { ReportPage } from "@/features/reports"
import { UserPage } from "@/features/users"
import { SettingsPage } from "@/features/settings"

export function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
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
