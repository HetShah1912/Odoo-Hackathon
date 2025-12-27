import { Card } from "@/components/ui/card"
import { Package, Wrench, CheckCircle2, AlertTriangle } from "lucide-react"

interface EquipmentStats {
  total: string | number
  active: string | number
  in_maintenance: string | number
  retired: string | number
}

interface RequestStats {
  total: string | number
  new: string | number
  in_progress: string | number
  completed: string | number
  overdue: string | number
}

interface CostStats {
  total_estimated: string | number
  total_actual: string | number
}

export function DashboardStats({
  equipmentStats,
  requestStats,
  costStats,
}: {
  equipmentStats: EquipmentStats
  requestStats: RequestStats
  costStats: CostStats
}) {
  const stats = [
    {
      title: "Total Equipment",
      value: equipmentStats.total,
      description: `${equipmentStats.active} active, ${equipmentStats.in_maintenance} in maintenance`,
      icon: Package,
      gradient: "from-chart-1 to-primary",
      iconBg: "bg-gradient-to-br from-chart-1/20 to-primary/20",
      glowColor: "glow-primary",
    },
    {
      title: "Active Requests",
      value: (Number(requestStats.new) + Number(requestStats.in_progress)).toString(),
      description: `${requestStats.new} new, ${requestStats.in_progress} in progress`,
      icon: Wrench,
      gradient: "from-chart-2 to-yellow-500",
      iconBg: "bg-gradient-to-br from-chart-2/20 to-yellow-500/20",
      glowColor: "glow-accent",
    },
    {
      title: "Completed Tasks",
      value: requestStats.completed,
      description: "Successfully completed",
      icon: CheckCircle2,
      gradient: "from-chart-4 to-green-500",
      iconBg: "bg-gradient-to-br from-chart-4/20 to-green-500/20",
      glowColor: "shadow-lg shadow-chart-4/20",
    },
    {
      title: "Overdue Tasks",
      value: requestStats.overdue.toString(),
      description: "Requires immediate attention",
      icon: AlertTriangle,
      gradient: "from-chart-5 to-red-500",
      iconBg: "bg-gradient-to-br from-chart-5/20 to-red-500/20",
      glowColor: "shadow-lg shadow-chart-5/20",
    },
    {
      title: "Total Costs",
      value: `₹${Number(costStats.total_actual).toLocaleString("en-IN")}`,
      description: `Estimated: ₹${Number(costStats.total_estimated).toLocaleString("en-IN")}`,
      icon: CheckCircle2,
      gradient: "from-chart-3 to-purple-500",
      iconBg: "bg-gradient-to-br from-chart-3/20 to-purple-500/20",
      glowColor: "glow-accent",
    },
  ]

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mb-6 sm:mb-8 lg:mb-12">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className={cn(
            "p-4 sm:p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 cursor-pointer group relative overflow-hidden",
            stat.glowColor,
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-chart-2/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 font-semibold uppercase tracking-wider">
                {stat.title}
              </p>
              <p
                className={cn(
                  "text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 tabular-nums bg-gradient-to-br bg-clip-text text-transparent",
                  stat.gradient,
                )}
              >
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
            </div>
            <div
              className={cn(
                "p-3 sm:p-3.5 rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                stat.iconBg,
              )}
            >
              <stat.icon
                className={cn("h-6 w-6 sm:h-7 sm:w-7 bg-gradient-to-br bg-clip-text text-transparent", stat.gradient)}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
