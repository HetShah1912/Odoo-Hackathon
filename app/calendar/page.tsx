import { sql } from "@/lib/db"
import { CalendarView } from "@/components/calendar-view"
import { Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

export const dynamic = "force-dynamic"

export default async function CalendarPage() {
  const result = await sql`
    SELECT 
      mr.id,
      mr.equipment_id,
      mr.title,
      mr.description,
      mr.priority,
      mr.status,
      mr.assigned_to,
      mr.requester_name,
      mr.due_date,
      mr.estimated_cost,
      mr.actual_cost,
      mr.created_at,
      mr.updated_at,
      e.name as equipment_name,
      e.category as equipment_category
    FROM maintenance_requests mr
    LEFT JOIN equipment e ON mr.equipment_id = e.id
    WHERE mr.due_date IS NOT NULL
    ORDER BY mr.due_date ASC
  `

  const requests = result.map((row) => ({
    ...row,
    id: Number(row.id),
    equipment_id: Number(row.equipment_id),
    estimated_cost: row.estimated_cost ? Number(row.estimated_cost) : undefined,
    actual_cost: row.actual_cost ? Number(row.actual_cost) : undefined,
  }))

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 via-chart-2/20 to-chart-3/20 border border-primary/20 backdrop-blur-sm">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-chart-2 bg-clip-text text-transparent text-balance tracking-tight">
              Maintenance Calendar
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground ml-[4.5rem]">
            View and track all scheduled maintenance tasks
          </p>
        </div>

        {requests.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <CalendarView requests={requests} />
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Scheduled Maintenance</h3>
            <p className="text-muted-foreground">There are no maintenance requests with due dates yet.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
