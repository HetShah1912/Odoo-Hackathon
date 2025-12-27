import { sql } from "@/lib/db"
import { cookies } from "next/headers"

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  // Simple hash function for demo - in production, use bcrypt
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

export async function generateSessionToken(): Promise<string> {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export async function createSession(userId: number): Promise<string> {
  const token = await generateSessionToken()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await sql`
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (${userId}, ${token}, ${expiresAt})
  `

  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return token
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session")?.value

  if (!sessionToken) {
    return null
  }

  const sessions = await sql`
    SELECT s.*, u.id, u.name, u.email, u.role
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ${sessionToken}
    AND s.expires_at > NOW()
  `

  if (sessions.length === 0) {
    return null
  }

  const session = sessions[0]
  return {
    id: session.id,
    name: session.name,
    email: session.email,
    role: session.role,
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session")?.value

  if (sessionToken) {
    await sql`DELETE FROM sessions WHERE token = ${sessionToken}`
  }

  cookieStore.delete("session")
}
