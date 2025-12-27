import { sql } from "@/lib/db"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentActivity } from "@/components/recent-activity"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const [equipmentStats, requestStats, recentRequests, categoryBreakdown, priorityBreakdown, costStats, costByCategory] = await Promise.all([
    sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'Active') as active,
        COUNT(*) FILTER (WHERE status = 'Maintenance') as in_maintenance,
        COUNT(*) FILTER (WHERE status = 'Retired') as retired
      FROM equipment
    `,
    sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'New') as new,
        COUNT(*) FILTER (WHERE status = 'In Progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'Completed') as completed,
        COUNT(*) FILTER (WHERE status = 'Overdue') as overdue
      FROM maintenance_requests
    `,
    sql`
      SELECT 
        mr.*,
        e.name as equipment_name,
        e.category as equipment_category
      FROM maintenance_requests mr
      LEFT JOIN equipment e ON mr.equipment_id = e.id
      ORDER BY mr.created_at DESC
      LIMIT 5
    `,
    sql`
      SELECT 
        e.category,
        COUNT(mr.id) as count
      FROM equipment e
      LEFT JOIN maintenance_requests mr ON e.id = mr.equipment_id
      GROUP BY e.category
      ORDER BY count DESC
    `,
    sql`
      SELECT 
        priority,
        COUNT(*) as count
      FROM maintenance_requests
      WHERE status != 'Completed'
      GROUP BY priority
      ORDER BY 
        CASE priority
          WHEN 'Critical' THEN 1
          WHEN 'High' THEN 2
          WHEN 'Medium' THEN 3
          WHEN 'Low' THEN 4
        END
    `,
    sql`
      SELECT 
        COALESCE(SUM(estimated_cost), 0) as total_estimated,
        COALESCE(SUM(actual_cost), 0) as total_actual
      FROM maintenance_requests
    `,
    sql`
      SELECT 
        e.category,
        COALESCE(SUM(mr.estimated_cost), 0) as estimated,
        COALESCE(SUM(mr.actual_cost), 0) as actual
      FROM equipment e
      LEFT JOIN maintenance_requests mr ON e.id = mr.equipment_id
      GROUP BY e.category
    `,
  ])

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8 lg:mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-chart-2 bg-clip-text text-transparent mb-3 text-balance tracking-tight">
            GearGuard Dashboard
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Complete overview of your maintenance operations
          </p>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <DashboardStats
            equipmentStats={equipmentStats[0] as any}
            requestStats={requestStats[0] as any}
            costStats={costStats[0] as any}
          />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <DashboardCharts
            categoryBreakdown={categoryBreakdown as any}
            priorityBreakdown={priorityBreakdown as any}
            costByCategory={costByCategory as any}
          />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <RecentActivity recentRequests={recentRequests as any} />
        </div>
      </div>
    </div>
  )
}
