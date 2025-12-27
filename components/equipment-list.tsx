"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Settings, Trash2 } from "lucide-react"
import { EditEquipmentDialog } from "./edit-equipment-dialog"
import { deleteEquipment } from "@/app/actions/equipment"

interface Equipment {
  id: number
  name: string
  category: string
  location: string
  purchase_date: string
  warranty_expiry: string
  status: string
  notes: string
}

export function EquipmentList({ equipment }: { equipment: Equipment[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-gradient-to-r from-chart-4/20 to-green-500/20 text-green-400 border-green-500/30 shadow-sm shadow-green-500/20"
      case "Maintenance":
        return "bg-gradient-to-r from-chart-2/20 to-yellow-500/20 text-yellow-400 border-yellow-500/30 shadow-sm shadow-yellow-500/20"
      case "Retired":
        return "bg-muted/50 text-muted-foreground border-border"
      default:
        return "bg-muted/50 text-muted-foreground border-border"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "IT Equipment":
        return "bg-gradient-to-r from-chart-1/20 to-primary/20 text-primary border-primary/30 shadow-sm shadow-primary/20"
      case "Machinery":
        return "bg-gradient-to-r from-chart-2/20 to-orange-500/20 text-orange-400 border-orange-500/30 shadow-sm shadow-orange-500/20"
      case "Vehicles":
        return "bg-gradient-to-r from-chart-3/20 to-purple-500/20 text-purple-400 border-purple-500/30 shadow-sm shadow-purple-500/20"
      default:
        return "bg-muted/50 text-muted-foreground border-border"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search equipment by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 border-border/50 focus:border-primary transition-colors bg-card/50 backdrop-blur-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-11 border-border/50 bg-card/50 backdrop-blur-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="IT Equipment">IT Equipment</SelectItem>
              <SelectItem value="Machinery">Machinery</SelectItem>
              <SelectItem value="Vehicles">Vehicles</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-11 border-border/50 bg-card/50 backdrop-blur-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Retired">Retired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filteredEquipment.map((item, index) => (
          <Link key={item.id} href={`/equipment/${item.id}`} className="group block">
            <Card
              className="p-4 sm:p-6 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 backdrop-blur-sm hover:border-primary/50 animate-in fade-in slide-in-from-bottom-4 group relative overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-chart-2/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">{item.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                  <EditEquipmentDialog equipment={item}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </EditEquipmentDialog>
                  <form action={deleteEquipment}>
                    <input type="hidden" name="id" value={item.id} />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="submit"
                      className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>

              <div className="space-y-2 text-sm relative z-10">
                {item.location && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{item.location}</span>
                  </div>
                )}
                {item.purchase_date && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purchased:</span>
                    <span className="font-medium">{new Date(item.purchase_date).toLocaleDateString()}</span>
                  </div>
                )}
                {item.warranty_expiry && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warranty:</span>
                    <span className="font-medium">{new Date(item.warranty_expiry).toLocaleDateString()}</span>
                  </div>
                )}
                {item.notes && <p className="text-muted-foreground mt-3 pt-3 border-t border-border/50">{item.notes}</p>}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-16 sm:py-20 animate-in fade-in zoom-in duration-500">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-muted/50 mb-4 backdrop-blur-sm">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-base sm:text-lg font-medium">No equipment found</p>
          <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}
