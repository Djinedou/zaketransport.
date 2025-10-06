import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const settings = await sql`
      SELECT key, value
      FROM system_settings
    `

    // Convert array to object
    const settingsObj = settings.reduce((acc: any, setting: any) => {
      acc[setting.key] = setting.value
      return acc
    }, {})

    return NextResponse.json(settingsObj)
  } catch (error) {
    console.error("[v0] Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Update each setting
    for (const [key, value] of Object.entries(body)) {
      await sql`
        INSERT INTO system_settings (key, value)
        VALUES (${key}, ${value as string})
        ON CONFLICT (key)
        DO UPDATE SET value = ${value as string}
      `
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error saving settings:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
