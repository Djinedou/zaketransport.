import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const bookings = await sql`
      SELECT b.*, r.origin, r.destination 
      FROM bookings b
      LEFT JOIN routes r ON b.route_id = r.id
      ORDER BY b.created_at DESC
      LIMIT 50
    `
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("[v0] Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
