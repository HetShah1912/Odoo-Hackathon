"use server"

import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addEquipment(formData: FormData) {
  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const location = formData.get("location") as string
  const status = formData.get("status") as string
  const purchase_date = formData.get("purchase_date") as string
  const warranty_expiry = formData.get("warranty_expiry") as string
  const notes = formData.get("notes") as string

  await sql`
    INSERT INTO equipment (name, category, location, purchase_date, warranty_expiry, status, notes)
    VALUES (${name}, ${category}, ${location || null}, ${purchase_date || null}, ${warranty_expiry || null}, ${status}, ${notes || null})
  `

  revalidatePath("/equipment")
}

export async function updateEquipment(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const location = formData.get("location") as string
  const status = formData.get("status") as string
  const purchase_date = formData.get("purchase_date") as string
  const warranty_expiry = formData.get("warranty_expiry") as string
  const notes = formData.get("notes") as string

  await sql`
    UPDATE equipment 
    SET name = ${name},
        category = ${category},
        location = ${location || null},
        purchase_date = ${purchase_date || null},
        warranty_expiry = ${warranty_expiry || null},
        status = ${status},
        notes = ${notes || null},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `

  revalidatePath("/equipment")
}

export async function deleteEquipment(formData: FormData) {
  const id = formData.get("id") as string

  await sql`DELETE FROM equipment WHERE id = ${id}`

  revalidatePath("/equipment")
}
