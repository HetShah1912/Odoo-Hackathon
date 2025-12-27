import { sql } from "@/lib/db"
import { KanbanBoard } from "@/components/kanban-board"
import { AddMaintenanceDialog } from "@/components/add-maintenance-dialog"
import { Button } from "@/components/ui/button"
import { Plus, LayoutGrid } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function MaintenancePage() {
  const [requests, equipment] = await Promise.all([
    sql`
      SELECT 
        mr.*,
        e.name as equipment_name,
        e.category as equipment_category
      FROM maintenance_requests mr
      LEFT JOIN equipment e ON mr.equipment_id = e.id
      ORDER BY 
        CASE mr.priority
          WHEN 'Critical' THEN 1
          WHEN 'High' THEN 2
          WHEN 'Medium' THEN 3
          WHEN 'Low' THEN 4
        END,
        mr.due_date ASC NULLS LAST
    `,
    sql`SELECT id, name, category FROM equipment WHERE status = 'Active' ORDER BY name`,
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-950 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 backdrop-blur-sm border border-primary/30 glow-primary">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance tracking-tight">
                  Maintenance Board
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  Organize and track maintenance requests efficiently
                </p>
              </div>
            </div>
          </div>
          <AddMaintenanceDialog equipment={equipment}>
            <Button
              size="lg"
              className="gap-2 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-gradient-to-r from-primary to-chart-1 border-0 glow-primary h-12 px-6"
            >
              <Plus className="h-5 w-5" />
              <span>Create Request</span>
            </Button>
          </AddMaintenanceDialog>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <KanbanBoard requests={requests} equipment={equipment} />
        </div>
      </div>
    </div>
  )
}
