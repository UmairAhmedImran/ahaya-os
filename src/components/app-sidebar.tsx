import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from "../assets/logo.svg"
import { Separator } from "./ui/separator"
import { cn } from "@/lib/utils"
import { useLocation } from "react-router-dom"
import AnalyticPic from "../assets/Container-1.svg"
import DashboardPic from "../assets/Container.svg"
import ReportPic from "../assets/Container-2.svg"
import UserPic from "../assets/Container-3.svg"
import SettingPic from "../assets/Container-4.svg"
import { Plus } from "lucide-react"

export function AppSidebar() {
  const { pathname } = useLocation()

  const section = [
    {
      icon: DashboardPic,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: AnalyticPic,
      label: "Analytics",
      href: "/analytics",
    },
    {
      icon: ReportPic,
      label: "Report",
      href: "/report",
    },
    {
      icon: UserPic,
      label: "User",
      href: "/user",
    },
    {
      icon: SettingPic,
      label: "Settings",
      href: "/settings",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex gap-x-2 p-2">
              <img src={logo} alt="logo" className="size-6" />
              <span className="items-center text-xl font-semibold text-indigo-900">
                Sample Logo
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      pathname === item.href &&
                      "[&[data-active=true]]:border-l-4 [&[data-active=true]]:border-indigo-500 [&[data-active=true]]:bg-indigo-50 [&[data-active=true]]:text-indigo-700",
                      "transition-colors hover:bg-indigo-100/40 hover:text-indigo-800",
                      pathname === item.href &&
                      "hover:bg-indigo-100 hover:text-indigo-900"
                    )}
                  >
                    <a href={item.href}>
                      <img src={item.icon} className="size-3.5" />
                      <span className="text-sm font-light tracking-tight">
                        {item.label}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="px-4 py-8 ">
        <Separator className="opacity-30 text-[#5D6B68]" />
      </div>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center justify-center gap-x-1 bg-primary p-6 text-white transition-colors hover:!bg-indigo-600 hover:!text-white">
                <Plus className="size-5" />
                <span className="text-sm font-light tracking-tight">
                  New Insight
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
