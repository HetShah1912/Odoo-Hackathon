"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface CategoryBreakdown {
  category: string
  count: string | number
}

interface PriorityBreakdown {
  priority: string
  count: string | number
}

interface CostByCategory {
  category: string
  estimated: string | number
  actual: string | number
}

const COLORS = {
  "IT Equipment": "oklch(0.65 0.24 195)",
  Machinery: "oklch(0.68 0.22 70)",
  Vehicles: "oklch(0.7 0.2 280)",
  Critical: "oklch(0.66 0.24 340)",
  High: "oklch(0.68 0.22 70)",
  Medium: "oklch(0.62 0.18 160)",
  Low: "oklch(0.65 0.24 195)",
}

export function DashboardCharts({
  categoryBreakdown,
  priorityBreakdown,
  costByCategory,
}: {
  categoryBreakdown: CategoryBreakdown[]
  priorityBreakdown: PriorityBreakdown[]
  costByCategory: CostByCategory[]
}) {
  const categoryData = categoryBreakdown.map((item) => ({
    category: item.category,
    count: Number(item.count),
  }))

  const priorityData = priorityBreakdown.map((item) => ({
    name: item.priority,
    value: Number(item.count),
  }))

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 mb-6 sm:mb-8 lg:mb-12">
      <Card className="p-4 sm:p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 backdrop-blur-sm glass-effect group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-chart-2/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-3 relative z-10">
          <div className="h-1 w-10 bg-gradient-to-r from-primary via-chart-1 to-chart-2 rounded-full shadow-lg glow-primary" />
          <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Maintenance by Category
          </span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" opacity={0.3} />
            <XAxis
              dataKey="category"
              className="text-xs"
              stroke="oklch(0.62 0.02 264)"
              tick={{ fill: "oklch(0.62 0.02 264)" }}
            />
            <YAxis className="text-xs" stroke="oklch(0.62 0.02 264)" tick={{ fill: "oklch(0.62 0.02 264)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.17 0.02 264)",
                border: "1px solid oklch(0.25 0.02 264)",
                borderRadius: "12px",
                boxShadow: "0 10px 40px oklch(0.13 0.02 264 / 0.5)",
              }}
              labelStyle={{ color: "oklch(0.97 0.01 264)" }}
            />
            <Bar dataKey="count" radius={[12, 12, 0, 0]}>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.category as keyof typeof COLORS]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4 sm:p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 backdrop-blur-sm glass-effect group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-chart-2/0 via-transparent to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-3 relative z-10">
          <div className="h-1 w-10 bg-gradient-to-r from-chart-2 via-primary to-chart-1 rounded-full shadow-lg glow-accent" />
          <span className="bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-transparent">
            Requests by Priority
          </span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              stroke="oklch(0.17 0.02 264)"
              strokeWidth={2}
            >
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.17 0.02 264)",
                border: "1px solid oklch(0.25 0.02 264)",
                borderRadius: "12px",
                boxShadow: "0 10px 40px oklch(0.13 0.02 264 / 0.5)",
              }}
              labelStyle={{ color: "oklch(0.97 0.01 264)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="lg:col-span-2 p-4 sm:p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 backdrop-blur-sm glass-effect group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-chart-3/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-3 relative z-10">
          <div className="h-1 w-10 bg-gradient-to-r from-primary via-chart-2 to-chart-3 rounded-full shadow-lg glow-primary" />
          <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Estimated vs Actual Costs by Category
          </span>
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={costByCategory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" opacity={0.3} />
            <XAxis
              dataKey="category"
              className="text-xs"
              stroke="oklch(0.62 0.02 264)"
              tick={{ fill: "oklch(0.62 0.02 264)" }}
            />
            <YAxis
              className="text-xs"
              stroke="oklch(0.62 0.02 264)"
              tick={{ fill: "oklch(0.62 0.02 264)" }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, ""]}
              contentStyle={{
                backgroundColor: "oklch(0.17 0.02 264)",
                border: "1px solid oklch(0.25 0.02 264)",
                borderRadius: "12px",
                boxShadow: "0 10px 40px oklch(0.13 0.02 264 / 0.5)",
              }}
              labelStyle={{ color: "oklch(0.97 0.01 264)" }}
            />
            <Bar dataKey="estimated" name="Estimated Cost" fill="oklch(0.62 0.18 160)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="actual" name="Actual Cost" fill="oklch(0.7 0.2 280)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
