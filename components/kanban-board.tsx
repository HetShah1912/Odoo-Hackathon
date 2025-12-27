"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Calendar, DollarSign, Settings, Trash2, User, Clock, ArrowRight, RefreshCcw } from "lucide-react"
import { updateMaintenanceStatus, deleteMaintenanceRequest } from "@/app/actions/maintenance"
import { EditMaintenanceDialog } from "./edit-maintenance-dialog"
import { cn } from "@/lib/utils"

interface MaintenanceRequest {
  id: number
  equipment_id: number
  equipment_name: string
  equipment_category: string
  title: string
  description: string
  priority: string
  status: string
  assigned_to: string
  requester_name: string
  due_date: string
  estimated_cost: string
  actual_cost: string
  is_recurring?: boolean
  frequency?: string
}

interface Equipment {
  id: number
  name: string
  category: string
}

const columns = ["New", "In Progress", "Completed", "Overdue"]

export function KanbanBoard({
  requests,
  equipment,
}: {
  requests: MaintenanceRequest[]
  equipment: Equipment[]
}) {
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredRequests = requests.filter((request) => {
    if (priorityFilter === "all") return true
    return request.priority === priorityFilter
  })

  const getRequestsByStatus = (status: string) => {
    return filteredRequests.filter((request) => request.status === status)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500/20 text-red-400 border-red-500/50 shadow-lg shadow-red-500/20 glow-red"
      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-lg shadow-orange-500/20"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50 shadow-lg shadow-yellow-500/20"
      case "Low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-lg shadow-blue-500/20"
      default:
        return "bg-muted/50 text-muted-foreground border-border"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-gradient-to-r from-primary to-chart-1 text-white shadow-lg glow-primary"
      case "In Progress":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
      case "Completed":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
      case "Overdue":
        return "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg glow-red"
      default:
        return "bg-muted/50 text-muted-foreground"
    }
  }

  const getColumnGradient = (status: string) => {
    switch (status) {
      case "New":
        return "from-primary/20 via-chart-1/10 to-transparent border-primary/30"
      case "In Progress":
        return "from-yellow-500/20 via-orange-500/10 to-transparent border-yellow-500/30"
      case "Completed":
        return "from-green-500/20 via-emerald-500/10 to-transparent border-green-500/30"
      case "Overdue":
        return "from-red-500/20 via-rose-500/10 to-transparent border-red-500/30"
      default:
        return "from-muted/10 to-muted/5 border-border/30"
    }
  }

  const isOverdue = (dueDate: string, status: string) => {
    if (status === "Completed" || !dueDate) return false
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl border border-border/50 backdrop-blur-sm glass-effect shadow-xl bg-gradient-to-br from-card/80 via-card/60 to-card/40">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-foreground">Filter & Overview</h3>
              <Badge variant="outline" className="font-mono">
                {filteredRequests.length} total
              </Badge>
            </div>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-64 h-11 border-border/50 hover:border-primary/50 transition-all bg-background/50 backdrop-blur-sm">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Critical">🔴 Critical</SelectItem>
                <SelectItem value="High">🟠 High</SelectItem>
                <SelectItem value="Medium">🟡 Medium</SelectItem>
                <SelectItem value="Low">🔵 Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-chart-1/10 border border-primary/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">New</span>
                <div className="h-2 w-2 rounded-full bg-primary shadow-lg glow-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">{getRequestsByStatus("New").length}</span>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Progress</span>
                <div className="h-2 w-2 rounded-full bg-yellow-500 shadow-lg" />
              </div>
              <span className="text-2xl font-bold text-foreground">{getRequestsByStatus("In Progress").length}</span>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Done</span>
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-lg" />
              </div>
              <span className="text-2xl font-bold text-foreground">{getRequestsByStatus("Completed").length}</span>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/10 border border-red-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Overdue</span>
                <div className="h-2 w-2 rounded-full bg-red-500 shadow-lg glow-red animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-red-400">{getRequestsByStatus("Overdue").length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((status) => (
          <div key={status} className="space-y-4">
            <div
              className={cn(
                "flex items-center justify-between sticky top-16 py-4 px-5 z-10 rounded-2xl backdrop-blur-md shadow-2xl bg-gradient-to-br border-2",
                getColumnGradient(status),
              )}
            >
              <h2 className="font-bold text-lg tracking-tight">{status}</h2>
              <Badge variant="secondary" className={cn(getStatusColor(status), "font-bold px-3 py-1")}>
                {getRequestsByStatus(status).length}
              </Badge>
            </div>

            <div className="space-y-4 min-h-[200px]">
              {getRequestsByStatus(status).map((request, index) => (
                <Card
                  key={request.id}
                  className={cn(
                    "p-4 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-2 backdrop-blur-sm hover:border-primary/50 group relative overflow-hidden animate-in fade-in slide-in-from-bottom-2",
                    "bg-gradient-to-br from-card/90 via-card/80 to-card/70",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-chart-2/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-1.5">
                        <h3 className="font-semibold text-base leading-tight text-pretty line-clamp-2 group-hover:text-primary transition-colors">
                          {request.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Settings className="h-3.5 w-3.5" />
                          <span className="truncate">{request.equipment_name}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <EditMaintenanceDialog request={request} equipment={equipment}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </EditMaintenanceDialog>
                        <form action={deleteMaintenanceRequest}>
                          <input type="hidden" name="id" value={request.id} />
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10" type="submit">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </form>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={cn(getPriorityColor(request.priority), "font-semibold")}>
                        {request.priority}
                      </Badge>
                      {request.is_recurring && (
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/50 flex items-center gap-1">
                          <RefreshCcw className="h-3 w-3" />
                          {request.frequency}
                        </Badge>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-2.5">
                      {request.requester_name && (
                        <div className="flex items-center gap-2.5 text-sm p-2 rounded-lg bg-primary/10 border border-primary/30">
                          <User className="h-4 w-4 text-primary" />
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Requested by</span>
                            <span className="font-medium">{request.requester_name}</span>
                          </div>
                        </div>
                      )}

                      {request.assigned_to && (
                        <div className="flex items-center gap-2.5 text-sm p-2 rounded-lg bg-muted/30 border border-border/30">
                          <Settings className="h-4 w-4 text-chart-1" />
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Assigned to</span>
                            <span className="font-medium">{request.assigned_to}</span>
                          </div>
                        </div>
                      )}

                      {request.due_date && (
                        <div
                          className={cn(
                            "flex items-center gap-2.5 text-sm p-2 rounded-lg border",
                            isOverdue(request.due_date, request.status)
                              ? "bg-red-500/10 border-red-500/30 text-red-400"
                              : "bg-muted/30 border-border/30",
                          )}
                        >
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">
                            {new Date(request.due_date).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          {isOverdue(request.due_date, request.status) && (
                            <AlertCircle className="h-4 w-4 ml-auto animate-pulse" />
                          )}
                        </div>
                      )}

                      {request.estimated_cost && (
                        <div className="flex items-center gap-2.5 text-sm p-2 rounded-lg bg-chart-2/10 border border-chart-2/30">
                          <DollarSign className="h-4 w-4 text-chart-2" />
                          <span className="font-semibold text-chart-2">
                            ₹
                            {Number.parseFloat(request.estimated_cost).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Status Update Form */}
                    {request.status !== "Completed" && (
                      <form action={updateMaintenanceStatus} className="space-y-2 pt-2 border-t border-border/30">
                        <input type="hidden" name="id" value={request.id} />
                        <Select name="status" defaultValue={request.status}>
                          <SelectTrigger className="h-10 text-sm font-medium bg-background/50 hover:bg-background transition-colors">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Overdue">Overdue</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="submit"
                          size="sm"
                          className="w-full h-9 text-sm font-semibold gap-2 bg-gradient-to-r from-primary to-chart-1 hover:shadow-lg transition-all"
                        >
                          Update Status
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </form>
                    )}
                  </div>
                </Card>
              ))}

              {getRequestsByStatus(status).length === 0 && (
                <div
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-12 text-center bg-gradient-to-br backdrop-blur-sm",
                    getColumnGradient(status),
                  )}
                >
                  <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm font-medium text-muted-foreground">No {status.toLowerCase()} requests</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
