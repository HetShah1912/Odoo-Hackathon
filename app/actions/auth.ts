"use server"

import { sql } from "@/lib/db"
import { createSession, hashPassword, verifyPassword, deleteSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Find user by email
  const users = await sql`
    SELECT * FROM users WHERE email = ${email}
  `

  if (users.length === 0) {
    return { success: false, error: "Invalid email or password" }
  }

  const user = users[0]

  // Verify password
  const isValid = await verifyPassword(password, user.password_hash)

  if (!isValid) {
    return { success: false, error: "Invalid email or password" }
  }

  // Create session
  await createSession(user.id)

  return { success: true }
}

export async function signUp(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Check if user already exists
  const existingUsers = await sql`
    SELECT * FROM users WHERE email = ${email}
  `

  if (existingUsers.length > 0) {
    return { success: false, error: "Email already registered" }
  }

  // Hash password
  const passwordHash = await hashPassword(password)

  // Create user
  const newUsers = await sql`
    INSERT INTO users (name, email, password_hash)
    VALUES (${name}, ${email}, ${passwordHash})
    RETURNING id
  `

  const newUser = newUsers[0]

  // Create session
  await createSession(newUser.id)

  return { success: true }
}

export async function signOut() {
  await deleteSession()
  redirect("/auth/signin")
}
