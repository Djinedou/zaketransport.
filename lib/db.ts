"use server"

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function query(text: string, params?: any[]) {
  try {
    const result = await sql(text, params)
    return result
  } catch (error) {
    console.error("[v0] Database query error:", error)
    throw error
  }
}

export async function createBooking(data: {
  ticketNumber: string
  passengerName: string
  phone: string
  routeId: number
  travelDate: string
  departureTime: string
  seatNumber: number
  breakfastChoice: string
}) {
  const result = await query(
    `INSERT INTO bookings (ticket_number, passenger_name, phone, route_id, travel_date, departure_time, seat_number, breakfast_choice, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'confirmed')
     RETURNING *`,
    [
      data.ticketNumber,
      data.passengerName,
      data.phone,
      data.routeId,
      data.travelDate,
      data.departureTime,
      data.seatNumber,
      data.breakfastChoice,
    ],
  )
  return result[0]
}

export async function getBookingByTicketNumber(ticketNumber: string) {
  const result = await query(
    `SELECT b.*, r.origin, r.destination, r.price 
     FROM bookings b 
     JOIN routes r ON b.route_id = r.id 
     WHERE b.ticket_number = $1`,
    [ticketNumber],
  )
  return result[0]
}
