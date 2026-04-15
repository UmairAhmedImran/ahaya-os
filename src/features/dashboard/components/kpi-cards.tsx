import DollarIcon from "@/assets/Background.svg"
import UserIcon from "@/assets/Background-1.svg"
import ConversionIcon from "@/assets/Background-2.svg"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingDown, TrendingUp } from "lucide-react"

const allCards = [
  {
    icon: DollarIcon,
    label: "Total Revenue",
    value: "$45,231.00",
    trend: 12.5,
  },
  {
    icon: UserIcon,
    label: "Active Users",
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

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 pt-8 px-4 sm:grid-cols-3">
      {allCards.map((item, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle>
              <img src={item.icon} />
            </CardTitle>
            <CardAction>
              <p
                className={cn(
                  "flex items-center gap-1 rounded-xs p-1 text-xs",
                  item.trend > 0 && "bg-green-100 text-green-900",
                  item.trend < 0 && "bg-red-100 text-red-900"
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
