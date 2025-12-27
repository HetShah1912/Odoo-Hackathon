"use server"

import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addMaintenanceRequest(formData: FormData) {
  // Ensure schema is updated (Lazy migration)
  try {
    await sql`ALTER TABLE maintenance_requests ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT FALSE`
    await sql`ALTER TABLE maintenance_requests ADD COLUMN IF NOT EXISTS frequency VARCHAR(50) CHECK (frequency IN ('Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', 'None'))`
  } catch (e) {
    // Ignore if already exists or fails (PostgreSQL 9.6+ supports IF NOT EXISTS for ADD COLUMN)
  }

  const equipment_id = formData.get("equipment_id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as string
  const status = formData.get("status") as string
  const assigned_to = formData.get("assigned_to") as string
  const requester_name = formData.get("requester_name") as string
  const due_date = formData.get("due_date") as string
  const estimated_cost = formData.get("estimated_cost") as string
  const is_recurring = formData.get("is_recurring") === "on"
  const frequency = formData.get("frequency") as string

  await sql`
    INSERT INTO maintenance_requests (
      equipment_id, title, description, priority, status, 
      assigned_to, requester_name, due_date, estimated_cost,
      is_recurring, frequency
    )
    VALUES (
      ${equipment_id}, ${title}, ${description || null}, ${priority}, ${status}, 
      ${assigned_to || null}, ${requester_name || null}, ${due_date || null}, ${estimated_cost || null},
      ${is_recurring}, ${frequency || 'None'}
    )
  `

  revalidatePath("/maintenance")
}

export async function updateMaintenanceRequest(formData: FormData) {
  const id = formData.get("id") as string
  const equipment_id = formData.get("equipment_id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as string
  const status = formData.get("status") as string
  const assigned_to = formData.get("assigned_to") as string
  const requester_name = formData.get("requester_name") as string // Added requester_name
  const due_date = formData.get("due_date") as string
  const estimated_cost = formData.get("estimated_cost") as string
  const actual_cost = formData.get("actual_cost") as string

  const is_recurring = formData.get("is_recurring") === "on"
  const frequency = formData.get("frequency") as string

  await sql`
    UPDATE maintenance_requests 
    SET equipment_id = ${equipment_id},
        title = ${title},
        description = ${description || null},
        priority = ${priority},
        status = ${status},
        assigned_to = ${assigned_to || null},
        requester_name = ${requester_name || null},
        due_date = ${due_date || null},
        estimated_cost = ${estimated_cost || null},
        actual_cost = ${actual_cost || null},
        is_recurring = ${is_recurring},
        frequency = ${frequency},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `

  revalidatePath("/maintenance")
}

export async function updateMaintenanceStatus(formData: FormData) {
  const id = formData.get("id") as string
  const status = formData.get("status") as string

  await sql`
    UPDATE maintenance_requests 
    SET status = ${status},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `

  revalidatePath("/maintenance")
}

export async function deleteMaintenanceRequest(formData: FormData) {
  const id = formData.get("id") as string

  await sql`DELETE FROM maintenance_requests WHERE id = ${id}`

  revalidatePath("/maintenance")
}
