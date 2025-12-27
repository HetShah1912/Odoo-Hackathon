"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, User, Wrench, Clock, AlertCircle } from "lucide-react"

interface MaintenanceRequest {
  id: number
  equipment_name: string
  equipment_category: string
  title: string
  description?: string
  priority: string
  status: string
  assigned_to: string
  requester_name?: string
  due_date: string
  estimated_cost?: number
}

export function CalendarView({ requests }: { requests: MaintenanceRequest[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }, [currentDate])

  const getRequestsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return requests.filter((req) => {
      if (!req.due_date) return false
      const reqDateStr = req.due_date.split("T")[0]
      return reqDateStr === dateStr
    })
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "On Hold":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const calendarDays = []
  for (let i = 0; i < daysInMonth.startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth.daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-card/50 via-card to-card/50 backdrop-blur-xl border-border/50 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {monthNames[daysInMonth.month]} {daysInMonth.year}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={previousMonth}
              className="hover:bg-primary/10 hover:border-primary/30 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
              className="hover:bg-primary/10 hover:border-primary/30"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              className="hover:bg-primary/10 hover:border-primary/30 bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center font-semibold text-xs sm:text-sm text-muted-foreground p-2">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 1)}</span>
            </div>
          ))}

          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            const date = new Date(daysInMonth.year, daysInMonth.month, day)
            const dayRequests = getRequestsForDate(date)

            return (
              <div
                key={day}
                className={`aspect-square border rounded-lg p-1 sm:p-2 ${
                  isToday(day)
                    ? "bg-primary/10 border-primary/50 ring-2 ring-primary/20"
                    : "border-border/50 hover:border-primary/30"
                } hover:bg-accent/30 transition-all duration-200`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isToday(day) ? "text-primary font-bold" : "text-foreground"
                      }`}
                    >
                      {day}
                    </span>
                    {dayRequests.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="h-4 sm:h-5 px-1 text-[10px] sm:text-xs bg-primary/20 text-primary border-primary/30"
                      >
                        {dayRequests.length}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 overflow-y-auto flex-1">
                    {dayRequests.slice(0, 2).map((request) => (
                      <div
                        key={request.id}
                        className={`text-[10px] sm:text-xs p-0.5 sm:p-1 rounded border ${getPriorityColor(request.priority)} truncate`}
                        title={request.title}
                      >
                        {request.title}
                      </div>
                    ))}
                    {dayRequests.length > 2 && (
                      <div className="text-[10px] text-muted-foreground text-center">+{dayRequests.length - 2}</div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="p-4 sm:p-6 bg-gradient-to-br from-card/50 via-card to-card/50 backdrop-blur-xl border-border/50 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-chart-2/10 border border-chart-2/20">
            <Clock className="h-5 w-5 text-chart-2" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-transparent">
            Upcoming Maintenance Tasks
          </h3>
        </div>

        <div className="space-y-3">
          {requests
            .filter((req) => new Date(req.due_date) >= new Date())
            .slice(0, 10)
            .map((request) => {
              const dueDate = new Date(request.due_date)
              const today = new Date()
              const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
              const isOverdue = daysUntilDue < 0
              const isUrgent = daysUntilDue <= 3 && daysUntilDue >= 0

              return (
                <div
                  key={request.id}
                  className="group p-4 border border-border/50 rounded-xl bg-gradient-to-br from-card/30 to-card/50 hover:from-card/50 hover:to-card/70 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-2">
                        <Wrench className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
                            {request.title}
                          </h4>
                          {request.description && (
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                              {request.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/50">
                          <Wrench className="h-3 w-3" />
                          <span>{request.equipment_name}</span>
                        </div>

                        {request.assigned_to && (
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/50">
                            <User className="h-3 w-3" />
                            <span>{request.assigned_to}</span>
                          </div>
                        )}

                        {request.requester_name && (
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/50">
                            <User className="h-3 w-3" />
                            <span className="text-muted-foreground/80">By: {request.requester_name}</span>
                          </div>
                        )}

                        <div
                          className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${
                            isOverdue
                              ? "bg-red-500/20 text-red-400"
                              : isUrgent
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-accent/50"
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          <span>{dueDate.toLocaleDateString("en-IN")}</span>
                          {(isOverdue || isUrgent) && <AlertCircle className="h-3 w-3" />}
                        </div>

                        {request.estimated_cost && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/10 text-green-400 border border-green-500/20">
                            <span className="font-semibold">₹{request.estimated_cost.toLocaleString("en-IN")}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 sm:items-end">
                      <Badge variant="outline" className={`${getPriorityColor(request.priority)} text-xs`}>
                        {request.priority}
                      </Badge>
                      <Badge variant="outline" className={`${getStatusColor(request.status)} text-xs`}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}

          {requests.filter((req) => new Date(req.due_date) >= new Date()).length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No upcoming maintenance scheduled</p>
              <p className="text-sm text-muted-foreground/60 mt-1">All tasks are up to date</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
