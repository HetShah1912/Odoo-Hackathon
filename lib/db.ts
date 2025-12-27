import { neon } from "@neondatabase/serverless"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    'No database connection string provided to neon(). Set `DATABASE_URL` in .env.local or your deployment environment.'
  )
}

export const sql = neon(databaseUrl)
