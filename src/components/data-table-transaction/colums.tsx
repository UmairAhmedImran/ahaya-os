import type { ColumnDef } from "@tanstack/react-table"

export type RecentActivites = {
  id: string
  user: string
  status: "active" | "inactive" | "suspended"
  lastActive: string
  revenue: number
}

export const columns: ColumnDef<RecentActivites>[] = [

  {
    accessorKey: "user",
    header: "USER",
  },
  {
    accessorKey: "status",
    header: "STATUS",
  },
  {
    accessorKey: "lastActive",
    header: "LAST ACTIVE",
  },
  {
    accessorKey: "revenue",
    header: "REVENUE",
  },
]
