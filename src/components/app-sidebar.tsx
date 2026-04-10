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
import { ChartColumn, LayoutDashboard, Plus, Proportions, Settings, UsersRound } from "lucide-react"
import { Separator } from "./ui/separator"
import { cn } from "@/lib/utils"
import { useLocation } from "react-router-dom"

export function AppSidebar() {

  const { pathname } = useLocation();


  const section = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: ChartColumn,
      label: "Analytics",
      href: "/analytics",
    },
    {
      icon: Proportions,
      label: "Report",
      href: "/report",
    },
    {
      icon: UsersRound,
      label: "User",
      href: "/user",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex p-2 gap-x-2">
              <img src={logo} alt="logo" className="size-6" />
              <span className="items-center text-xl text-indigo-900 font-semibold">Sample Logo</span>
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
                  <SidebarMenuButton asChild
                    isActive={pathname === item.href}
                  >
                    <a href={item.href}>
                      <item.icon className={cn("size-5 text-indigo-900")} />
                      <span className="text-sm font-light tracking-tight">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* <div className="px-4 py-2"> */}
      {/*   <Separator className="opacity-10 text-[#5D6B68]" /> */}
      {/* </div> */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex justify-center gap-x-1 items-center bg-primary text-white p-6 hover:text-white">
                <Plus />
                <span>New Insight</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
