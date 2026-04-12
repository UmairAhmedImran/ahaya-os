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
    <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-x-2 pt-12">
      {allCards.map((item) => (
        <Card className="w-full ">
          <CardHeader>
            <CardTitle>
              <img src={item.icon} />
            </CardTitle>
            <CardAction>
              <p className={cn(
                item.trend > 0 &&
                "bg-green-100 text-green-900 p-1 text-xs rounded-xs flex flex-row items-center gap-x-1",
                item.trend < 0 &&
                "bg-red-100 text-red-900 p-1 text-xs rounded-xs flex-row flex items-center gap-x-1"
              )}>
                {item.trend > 0 ? (
                  <TrendingUp className="size-3 " />
                ) : <TrendingDown className="size-3 " />}
                {item.trend}%
              </p>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="pt-2 font-light text-xs">
              {item.label}
            </div>
            <div className="text-3xl font-semibold pt-1 tracking-wide">
              {item.value}
            </div>
          </CardContent>
        </Card>

      ))}
    </div>
  )
}
