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

// Routes
export async function getRoutes() {
  return await query("SELECT * FROM routes ORDER BY origin, destination")
}

export async function getRouteById(id: number) {
  const result = await query("SELECT * FROM routes WHERE id = $1", [id])
  return result[0]
}

// Bookings
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

// Packages
export async function createPackage(data: {
  trackingNumber: string
  senderName: string
  senderPhone: string
  recipientName: string
  recipientPhone: string
  routeId: number
  packageDescription: string
}) {
  const result = await query(
    `INSERT INTO packages (tracking_number, sender_name, sender_phone, recipient_name, recipient_phone, route_id, package_description, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
     RETURNING *`,
    [
      data.trackingNumber,
      data.senderName,
      data.senderPhone,
      data.recipientName,
      data.recipientPhone,
      data.routeId,
      data.packageDescription,
    ],
  )
  return result[0]
}

export async function getPackageByTrackingNumber(trackingNumber: string) {
  const result = await query(
    `SELECT p.*, r.origin, r.destination 
     FROM packages p 
     JOIN routes r ON p.route_id = r.id 
     WHERE p.tracking_number = $1`,
    [trackingNumber],
  )
  return result[0]
}

// Reports
export async function createReport(data: {
  reporterName: string
  phone: string
  reportType: string
  description: string
}) {
  const result = await query(
    `INSERT INTO reports (reporter_name, phone, report_type, description, status)
     VALUES ($1, $2, $3, $4, 'pending')
     RETURNING *`,
    [data.reporterName, data.phone, data.reportType, data.description],
  )
  return result[0]
}

// System Settings
export async function getSystemSettings() {
  return await query("SELECT * FROM system_settings")
}

export async function updateSystemSetting(key: string, value: string) {
  await query(
    `INSERT INTO system_settings (setting_key, setting_value, updated_at)
     VALUES ($1, $2, CURRENT_TIMESTAMP)
     ON CONFLICT (setting_key) 
     DO UPDATE SET setting_value = $2, updated_at = CURRENT_TIMESTAMP`,
    [key, value],
  )
}
