"use client"

import { useState, useEffect } from "react"
import { columns } from "./colums.tsx"
import type { RecentActivites } from "./colums.tsx"
import { DataTable } from "./data-table"

async function getData(): Promise<RecentActivites[]> {
  return [
    {
      id: "728ed52f",
      user: "jamil",
      status: "active",
      lastActive: "2 min ago",
      revenue: 120,
    },
    {
      id: "728ed52f",
      user: "jamil",
      status: "active",
      lastActive: "2 min ago",
      revenue: 120,
    },
    {
      id: "728ed52f",
      user: "jamil",
      status: "active",
      lastActive: "2 min ago",
      revenue: 120,
    },
  ]
}

export default function DashboardRecentActivites() {
  const [data, setData] = useState<RecentActivites[]>([])

  useEffect(() => {
    getData().then(setData)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
