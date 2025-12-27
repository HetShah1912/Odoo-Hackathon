"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Tag,
    Clock,
    Wrench,
    ShieldCheck,
    FileText,
    AlertCircle
} from "lucide-react"
import Link from "next/link"
import { EditEquipmentDialog } from "./edit-equipment-dialog"
import { AddMaintenanceDialog } from "./add-maintenance-dialog"
import { useState } from "react"

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

interface MaintenanceRequest {
    id: number
    equipment_id: number
    title: string
    description: string
    priority: string
    status: string
    assigned_to: string
    requester_name: string
    due_date: string
    created_at: string
    is_recurring?: boolean
    frequency?: string
}

interface EquipmentDetailViewProps {
    equipment: Equipment
    maintenanceHistory: MaintenanceRequest[]
}

export function EquipmentDetailView({ equipment, maintenanceHistory }: EquipmentDetailViewProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-500/20 text-green-400 border-green-500/30"
            case "Maintenance": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            case "Retired": return "bg-gray-500/20 text-gray-400 border-gray-500/30"
            default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Critical": return "bg-red-500/20 text-red-100 border-red-500/30"
            case "High": return "bg-orange-500/20 text-orange-400 border-orange-500/30"
            case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            default: return "bg-blue-500/20 text-blue-400 border-blue-500/30"
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Link
                        href="/equipment"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-2 w-fit"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Equipment
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{equipment.name}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className={getStatusColor(equipment.status)}>
                            {equipment.status}
                        </Badge>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {equipment.category}
                        </Badge>
                    </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <EditEquipmentDialog equipment={equipment}>
                        <Button variant="outline" className="flex-1 sm:flex-none">Edit Equipment</Button>
                    </EditEquipmentDialog>
                    <AddMaintenanceDialog equipment={[{ id: equipment.id, name: equipment.name, category: equipment.category }]}>
                        <Button className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-chart-2">
                            Request Maintenance
                        </Button>
                    </AddMaintenanceDialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Specifications */}
                <Card className="lg:col-span-1 p-6 space-y-6 glass-effect border-border/50">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Tag className="h-5 w-5 text-primary" />
                        Specifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="font-medium">{equipment.location || "Not specified"}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground">Purchase Date</p>
                                <p className="font-medium">
                                    {equipment.purchase_date ? new Date(equipment.purchase_date).toLocaleDateString() : "Unknown"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground">Warranty Expiry</p>
                                <p className="font-medium">
                                    {equipment.warranty_expiry ? new Date(equipment.warranty_expiry).toLocaleDateString() : "No warranty"}
                                </p>
                            </div>
                        </div>
                        {equipment.notes && (
                            <div className="flex items-start gap-3 pt-4 border-t border-border/50">
                                <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Notes</p>
                                    <p className="text-sm mt-1">{equipment.notes}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Maintenance History */}
                <Card className="lg:col-span-2 p-6 glass-effect border-border/50 overflow-hidden">
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                        <Wrench className="h-5 w-5 text-primary" />
                        Maintenance History
                    </h2>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {maintenanceHistory.length > 0 ? (
                            maintenanceHistory.map((request) => (
                                <div
                                    key={request.id}
                                    className="p-4 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-all group"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold group-hover:text-primary transition-colors">
                                                    {request.title}
                                                </h4>
                                                <Badge variant="outline" className={getPriorityColor(request.priority)}>
                                                    {request.priority}
                                                </Badge>
                                                {request.is_recurring && (
                                                    <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/50">
                                                        {request.frequency}
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {request.description}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span>Due: {new Date(request.due_date).toLocaleDateString()}</span>
                                                </div>
                                                {request.assigned_to && (
                                                    <div className="flex items-center gap-1">
                                                        <span>Assigned: {request.assigned_to}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge className="bg-primary/20 text-primary hover:bg-primary/20 border-primary/20">
                                                {request.status}
                                            </Badge>
                                            <span className="text-[10px] text-muted-foreground italic">
                                                Created: {new Date(request.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4 text-muted-foreground">
                                    <AlertCircle className="h-8 w-8" />
                                </div>
                                <p className="text-muted-foreground font-medium">No maintenance history found</p>
                                <p className="text-sm text-muted-foreground/60 mt-1">
                                    Requests will appear here once created.
                                </p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}
