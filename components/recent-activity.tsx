import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

interface RecentRequest {
  id: number
  equipment_name: string
  equipment_category: string
  title: string
  priority: string
  status: string
  created_at: string
  is_recurring?: boolean
  frequency?: string
}

export function RecentActivity({ recentRequests }: { recentRequests: RecentRequest[] }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-gradient-to-r from-chart-5/20 to-red-500/20 text-red-400 border-red-500/30 shadow-sm shadow-red-500/20"
      case "High":
        return "bg-gradient-to-r from-chart-2/20 to-orange-500/20 text-orange-400 border-orange-500/30 shadow-sm shadow-orange-500/20"
      case "Medium":
        return "bg-gradient-to-r from-chart-4/20 to-yellow-500/20 text-yellow-400 border-yellow-500/30 shadow-sm shadow-yellow-500/20"
      case "Low":
        return "bg-gradient-to-r from-chart-1/20 to-primary/20 text-primary border-primary/30 shadow-sm shadow-primary/20"
      default:
        return "bg-muted/50 text-muted-foreground border-border"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-gradient-to-r from-chart-1/20 to-primary/20 text-primary border-primary/30 shadow-sm shadow-primary/20"
      case "In Progress":
        return "bg-gradient-to-r from-chart-2/20 to-yellow-500/20 text-yellow-400 border-yellow-500/30 shadow-sm shadow-yellow-500/20"
      case "Completed":
        return "bg-gradient-to-r from-chart-4/20 to-green-500/20 text-green-400 border-green-500/30 shadow-sm shadow-green-500/20"
      case "Overdue":
        return "bg-gradient-to-r from-chart-5/20 to-red-500/20 text-red-400 border-red-500/30 shadow-sm shadow-red-500/20"
      default:
        return "bg-muted/50 text-muted-foreground border-border"
    }
  }

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  }

  return (
    <Card className="p-6 border border-border/50 backdrop-blur-sm glass-effect hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-chart-2/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Recent Activity
        </h3>
        <Link href="/maintenance">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-primary/10 hover:text-primary hover:border-primary transition-all bg-transparent"
          >
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-3 relative z-10">
        {recentRequests.map((request, index) => (
          <div
            key={request.id}
            className="flex items-start gap-4 p-4 border border-border/50 rounded-xl hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-left-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-1">
              <h4 className="font-semibold mb-1 text-pretty leading-snug">{request.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {request.equipment_name} ({request.equipment_category})
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={getPriorityColor(request.priority)}>
                  {request.priority}
                </Badge>
                <Badge variant="outline" className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
                {request.is_recurring && (
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 flex items-center gap-1">
                    <RefreshCcw className="h-3 w-3" />
                    <span className="text-[10px]">{request.frequency}</span>
                  </Badge>
                )}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{timeAgo(request.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {recentRequests.length === 0 && (
          <p className="text-center text-muted-foreground py-12 text-sm">No recent activity</p>
        )}
      </div>
    </Card>
  )
}
