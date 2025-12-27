"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addMaintenanceRequest } from "@/app/actions/maintenance"
import { Wrench, User, Calendar, DollarSign, AlertCircle, FileText, Package, Zap } from "lucide-react"

interface Equipment {
  id: number
  name: string
  category: string
}

export function AddMaintenanceDialog({
  equipment,
  children,
}: {
  equipment: Equipment[]
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden border-2 border-primary/30 shadow-2xl bg-card/95 backdrop-blur-xl">
        <DialogHeader className="space-y-3 pb-6 border-b border-border/50 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent -mx-6 -mt-6 px-6 pt-6 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 rounded-lg">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-chart-1 to-primary bg-clip-text text-transparent">
                Create Maintenance Request
              </DialogTitle>
              <DialogDescription className="text-base mt-1">
                Submit a new maintenance task with all necessary details
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(95vh-200px)] px-1">
          <form
            action={async (formData) => {
              await addMaintenanceRequest(formData)
              setOpen(false)
            }}
            className="space-y-8 pt-6"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 uppercase tracking-wide">
                <FileText className="h-4 w-4" />
                <span>Basic Information</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 p-5 bg-gradient-to-br from-primary/5 to-transparent rounded-lg border border-primary/10">
                <div className="space-y-2.5 md:col-span-2">
                  <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-2">
                    <span>Request Title</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    required
                    className="h-12 border-border/50 hover:border-primary/50 focus:border-primary transition-colors bg-background/50"
                    placeholder="e.g., AC Unit Not Cooling Properly"
                  />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="equipment_id" className="text-sm font-semibold flex items-center gap-2">
                    <Package className="h-3.5 w-3.5" />
                    <span>Equipment</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select name="equipment_id" required>
                    <SelectTrigger className="h-12 border-border/50 hover:border-primary/50 transition-all bg-background/50 hover:bg-background/80 group">
                      <SelectValue placeholder="Select equipment..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] bg-card/95 backdrop-blur-xl border-primary/20">
                      <div className="px-2 py-1.5 mb-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Available Equipment
                        </p>
                      </div>
                      {equipment.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id.toString()}
                          className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 my-0.5 rounded-md transition-colors"
                        >
                          <div className="flex items-center gap-3 py-1">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                              <Package className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-xs text-muted-foreground">{item.category}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="priority" className="text-sm font-semibold flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5" />
                    <span>Priority Level</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select name="priority" defaultValue="Medium" required>
                    <SelectTrigger className="h-12 border-border/50 hover:border-primary/50 transition-all bg-background/50 hover:bg-background/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-xl border-primary/20">
                      <div className="px-2 py-1.5 mb-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Select Priority
                        </p>
                      </div>
                      <SelectItem
                        value="Low"
                        className="cursor-pointer hover:bg-blue-500/10 focus:bg-blue-500/10 my-0.5 rounded-md"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 border border-blue-500/20">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Low Priority</span>
                            <span className="text-xs text-muted-foreground">Can be scheduled later</span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="Medium"
                        className="cursor-pointer hover:bg-yellow-500/10 focus:bg-yellow-500/10 my-0.5 rounded-md"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-500/10 border border-yellow-500/20">
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Medium Priority</span>
                            <span className="text-xs text-muted-foreground">Standard timeline</span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="High"
                        className="cursor-pointer hover:bg-orange-500/10 focus:bg-orange-500/10 my-0.5 rounded-md"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 border border-orange-500/20">
                            <span className="h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">High Priority</span>
                            <span className="text-xs text-muted-foreground">Needs attention soon</span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="Critical"
                        className="cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 my-0.5 rounded-md"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500/10 border border-red-500/20">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Critical Priority</span>
                            <span className="text-xs text-muted-foreground">Immediate attention required</span>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2.5 md:col-span-2">
                  <Label htmlFor="description" className="text-sm font-semibold">
                    Detailed Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="resize-none border-border/50 hover:border-primary/50 focus:border-primary transition-colors bg-background/50"
                    placeholder="Provide a detailed description of the issue and any relevant information..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 uppercase tracking-wide">
                <User className="h-4 w-4" />
                <span>Assignment Details</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 p-5 bg-gradient-to-br from-chart-1/5 to-transparent rounded-lg border border-chart-1/10">
                <div className="space-y-2.5">
                  <Label htmlFor="requester_name" className="text-sm font-semibold flex items-center gap-2">
                    <User className="h-3.5 w-3.5" />
                    <span>Requester Name</span>
                  </Label>
                  <Input
                    id="requester_name"
                    name="requester_name"
                    className="h-12 border-border/50 hover:border-primary/50 focus:border-primary transition-colors bg-background/50"
                    placeholder="e.g., Rajesh Kumar"
                  />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="assigned_to" className="text-sm font-semibold flex items-center gap-2">
                    <User className="h-3.5 w-3.5" />
                    <span>Assign To Technician</span>
                  </Label>
                  <Input
                    id="assigned_to"
                    name="assigned_to"
                    className="h-12 border-border/50 hover:border-primary/50 focus:border-primary transition-colors bg-background/50"
                    placeholder="e.g., Amit Sharma"
                  />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="status" className="text-sm font-semibold flex items-center gap-2">
                    <span>Initial Status</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select name="status" defaultValue="New" required>
                    <SelectTrigger className="h-12 border-border/50 hover:border-primary/50 transition-all bg-background/50 hover:bg-background/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-xl border-primary/20">
                      <div className="px-2 py-1.5 mb-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Request Status
                        </p>
                      </div>
                      <SelectItem
                        value="New"
                        className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 my-0.5 rounded-md"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                            <span className="text-lg">📋</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">New Request</span>
                            <span className="text-xs text-muted-foreground">Awaiting assignment</span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="In Progress"
                        className="cursor-pointer hover:bg-chart-1/10 focus:bg-chart-1/10 my-0.5 rounded-md"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-chart-1/10">
                            <span className="text-lg">⚙️</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">In Progress</span>
                            <span className="text-xs text-muted-foreground">Currently being worked on</span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="Completed"
                        className="cursor-pointer hover:bg-green-500/10 focus:bg-green-500/10 my-0.5 rounded-md"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10">
                            <span className="text-lg">✅</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Completed</span>
                            <span className="text-xs text-muted-foreground">Task finished successfully</span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="Overdue"
                        className="cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 my-0.5 rounded-md"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500/10">
                            <span className="text-lg">⚠️</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Overdue</span>
                            <span className="text-xs text-muted-foreground">Past due date</span>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 uppercase tracking-wide">
                <Calendar className="h-4 w-4" />
                <span>Schedule & Budget</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 p-5 bg-gradient-to-br from-chart-2/5 to-transparent rounded-lg border border-chart-2/10">
                <div className="space-y-2.5">
                  <Label htmlFor="due_date" className="text-sm font-semibold flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Due Date</span>
                  </Label>
                  <Input
                    id="due_date"
                    name="due_date"
                    type="date"
                    className="h-12 border-border/50 hover:border-primary/50 focus:border-primary transition-colors bg-background/50"
                  />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="estimated_cost" className="text-sm font-semibold flex items-center gap-2">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span>Estimated Cost (₹)</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                      ₹
                    </span>
                    <Input
                      id="estimated_cost"
                      name="estimated_cost"
                      type="number"
                      step="0.01"
                      min="0"
                      className="h-12 pl-10 border-border/50 hover:border-primary/50 focus:border-primary transition-colors bg-background/50"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 uppercase tracking-wide">
                <Zap className="h-4 w-4" />
                <span>Recurrence (Optional)</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 p-5 bg-gradient-to-br from-accent/10 to-transparent rounded-lg border border-accent/20">
                <div className="flex items-center space-x-3 p-2">
                  <input
                    type="checkbox"
                    id="is_recurring"
                    name="is_recurring"
                    className="h-5 w-5 rounded border-border/50 text-primary focus:ring-primary/50 transition-all cursor-pointer"
                  />
                  <Label htmlFor="is_recurring" className="text-sm font-medium cursor-pointer">
                    Enable Recurring Schedule
                  </Label>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="frequency" className="text-sm font-semibold">
                    Frequency
                  </Label>
                  <Select name="frequency" defaultValue="None">
                    <SelectTrigger className="h-12 border-border/50 hover:border-primary/50 transition-all bg-background/50 hover:bg-background/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-xl border-primary/20">
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-border/50 sticky bottom-0 bg-card/95 backdrop-blur-sm -mx-1 px-1 pb-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-12 px-6 hover:bg-muted/50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-12 px-8 bg-gradient-to-r from-primary via-chart-1 to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-primary/50"
              >
                <Wrench className="mr-2 h-4 w-4" />
                Create Request
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
