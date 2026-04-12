import DollarIcon from "../assets/Background.svg"
import UserIcon from "../assets/Background-1.svg"
import ConversionIcon from "../assets/Background-2.svg"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card"
import { cn } from "@/lib/utils"
import { TrendingDown, TrendingUp } from "lucide-react"

export function DashboardCard() {
  const allCards = [
    {
      icon: DollarIcon,
      label: "Total Revenue",
      value: "$45,231.00",
      trend: 12.5,
    },
    {
      icon: UserIcon,
      label: "Action Users",
      value: "12,842",
      trend: 8.2,
    },
    {
      icon: ConversionIcon,
      label: "Conversion Rate",
      value: "3.4%",
      trend: -1.4,
    },
  ]

  return (
    <div className="flex flex-col gap-y-4 pt-8 pr-8 sm:flex-row sm:gap-x-8">
      {allCards.map((item) => (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <img src={item.icon} />
            </CardTitle>
            <CardAction>
              <p
                className={cn(
                  item.trend > 0 &&
                    "flex flex-row items-center gap-x-1 rounded-xs bg-green-100 p-1 text-xs text-green-900",
                  item.trend < 0 &&
                    "flex flex-row items-center gap-x-1 rounded-xs bg-red-100 p-1 text-xs text-red-900"
                )}
              >
                {item.trend > 0 ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {item.trend}%
              </p>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="pt-2 text-xs font-light">{item.label}</div>
            <div className="pt-1 text-3xl font-semibold tracking-wide">
              {item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
