import { sql } from "@/lib/db"
import { notFound } from "next/navigation"
import { EquipmentDetailView } from "@/components/equipment-detail-view"

interface PageProps {
    params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function EquipmentDetailPage({ params }: PageProps) {
    const { id } = await params

    const [equipmentResult, maintenanceRequests] = await Promise.all([
        sql`SELECT * FROM equipment WHERE id = ${id}`,
        sql`
      SELECT mr.*, e.name as equipment_name, e.category as equipment_category
      FROM maintenance_requests mr
      LEFT JOIN equipment e ON mr.equipment_id = e.id
      WHERE mr.equipment_id = ${id}
      ORDER BY mr.created_at DESC
    `,
    ])

    if (equipmentResult.length === 0) {
        notFound()
    }

    const equipment = equipmentResult[0]

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <EquipmentDetailView
                    equipment={equipment}
                    maintenanceHistory={maintenanceRequests}
                />
            </div>
        </div>
    )
}
