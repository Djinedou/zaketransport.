import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const bookings = await sql`
      SELECT 
        b.id,
        b.ticket_number,
        b.passenger_name,
        b.phone,
        b.origin,
        b.destination,
        b.travel_date,
        b.travel_time,
        b.seat_number,
        b.breakfast_choice,
        b.price,
        b.status,
        b.created_at
      FROM bookings b
      ORDER BY b.created_at DESC
      LIMIT 100
    `
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("[v0] Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
