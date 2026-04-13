"use client"

import type { ColumnDef, RowData } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
  }
}

export type Transaction = {
  id: string
  name: string
  email: string
  avatar?: string
  status: "active" | "inactive" | "suspended"
  lastActive: string
  revenue: number
}

const statusConfig = {
  active: {
    label: "Active",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-700",
  },
  inactive: {
    label: "Inactive",
    dot: "bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-700",
  },
  suspended: {
    label: "Suspended",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700",
  },
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "USER",
    cell: ({ row }) => {
      const name = row.original.name
      const email = row.original.email
      const avatar = row.original.avatar
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8 shrink-0">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{name}</span>
            <span className="text-xs text-muted-foreground truncate">{email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.original.status
      const config = statusConfig[status]
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
            config.badge
          )}
        >
          <span className={cn("size-1.5 rounded-full", config.dot)} />
          {config.label}
        </span>
      )
    },
  },
  {
    accessorKey: "lastActive",
    header: "LAST ACTIVE",
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    accessorKey: "revenue",
    header: "REVENUE",
    meta: {
      className: "hidden md:table-cell text-right",
    },
    cell: ({ row }) => {
      const revenue = row.original.revenue
      return (
        <span className="font-semibold text-sm">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(revenue)}
        </span>
      )
    },
  },
]
