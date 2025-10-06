import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const routes = await sql`SELECT * FROM routes ORDER BY id`
    return NextResponse.json(routes)
  } catch (error) {
    console.error("[v0] Error fetching routes:", error)
    return NextResponse.json({ error: "Failed to fetch routes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, origin, destination, price } = body

    if (id) {
      // Update existing route
      await sql`
        UPDATE routes 
        SET origin = ${origin}, destination = ${destination}, price = ${price}
        WHERE id = ${id}
      `
    } else {
      // Create new route
      await sql`
        INSERT INTO routes (origin, destination, price, duration)
        VALUES (${origin}, ${destination}, ${price}, '3-4 heures')
      `
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error saving route:", error)
    return NextResponse.json({ error: "Failed to save route" }, { status: 500 })
  }
}
