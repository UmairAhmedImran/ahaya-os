import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"
import { Outlet } from "react-router-dom"

export default function HomeLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden ">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden-x p-2">
          <Navbar />
          <main className="flex-1 overflow-auto p-4 ">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
