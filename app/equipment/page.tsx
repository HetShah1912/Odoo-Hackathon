import { sql } from "@/lib/db"
import { EquipmentList } from "@/components/equipment-list"
import { AddEquipmentDialog } from "@/components/add-equipment-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function EquipmentPage() {
  const equipment = await sql`
    SELECT * FROM equipment 
    ORDER BY created_at DESC
  `

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 text-balance">Equipment</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage all your assets and equipment</p>
          </div>
          <AddEquipmentDialog>
            <Button size="lg" className="gap-2 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add Equipment</span>
              <span className="sm:hidden">Add New</span>
            </Button>
          </AddEquipmentDialog>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <EquipmentList equipment={equipment} />
        </div>
      </div>
    </div>
  )
}
