"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { columns } from "./columns"
import type { Transaction } from "./columns"
import { DataTable } from "./data-table"
import User0 from "@/assets/User.png"
import User1 from "@/assets/User-1.png"
import User2 from "@/assets/User-2.png"
import User3 from "@/assets/User-3.png"

async function getData(): Promise<Transaction[]> {
  return [
    {
      id: "1",
      name: "Alexandre Paiva",
      email: "alex@resign.co",
      avatar: User0,
      status: "active",
      lastActive: "2 mins ago",
      revenue: 1450,
    },
    {
      id: "2",
      name: "Sarah Jenkins",
      email: "sarah@fintech.io",
      avatar: User1,
      status: "inactive",
      lastActive: "4 hours ago",
      revenue: 2890,
    },
    {
      id: "3",
      name: "David Miller",
      email: "d.miller@techub.com",
      avatar: User2,
      status: "active",
      lastActive: "12 mins ago",
      revenue: 840.5,
    },
    {
      id: "4",
      name: "Elena Rodriguez",
      email: "elena.r@agency.com",
      avatar: User3,
      status: "suspended",
      lastActive: "1 day ago",
      revenue: 5200,
    },
  ]
}

type Tab = "active" | "pending"

export function RecentTransactions() {
  const [data, setData] = useState<Transaction[]>([])
  const [activeTab, setActiveTab] = useState<Tab>("active")

  useEffect(() => {
    getData().then(setData)
  }, [])

  return (
    <div className="px-4 mt-8 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <div className="flex items-center gap-3">
          {(["active", "pending"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "text-sm capitalize transition-colors",
                activeTab === tab
                  ? "font-semibold text-foreground"
                  : "font-normal text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
