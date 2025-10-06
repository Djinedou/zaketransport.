import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const settings = await sql`SELECT * FROM system_settings`
    return NextResponse.json(settings)
  } catch (error) {
    console.error("[v0] Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { key, value } = body

    await sql`
      INSERT INTO system_settings (setting_key, setting_value, updated_at)
      VALUES (${key}, ${value}, NOW())
      ON CONFLICT (setting_key) 
      DO UPDATE SET setting_value = ${value}, updated_at = NOW()
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error saving setting:", error)
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 })
  }
}
