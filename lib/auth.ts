"use server"

import { cookies } from "next/headers"
import { getBookingByTicketNumber } from "./db"

export interface BookingSession {
  bookingId: string
  ticketNumber: string
  passengerName: string
  route: string
  date: string
  time: string
  seatNumber: number
  breakfastChoice: string
}

export async function loginWithTicket(
  ticketNumber: string,
): Promise<{ success: boolean; error?: string; booking?: BookingSession }> {
  try {
    const booking = await getBookingByTicketNumber(ticketNumber.toUpperCase())

    if (!booking) {
      return { success: false, error: "Numéro de billet invalide. Veuillez vérifier votre numéro de réservation." }
    }

    const bookingSession: BookingSession = {
      bookingId: booking.id.toString(),
      ticketNumber: booking.ticket_number,
      passengerName: booking.passenger_name,
      route: `${booking.origin} → ${booking.destination}`,
      date: booking.travel_date,
      time: booking.departure_time,
      seatNumber: booking.seat_number,
      breakfastChoice: booking.breakfast_choice,
    }

    // Set session cookie with booking info
    const cookieStore = await cookies()
    cookieStore.set("booking_session", JSON.stringify(bookingSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return { success: true, booking: bookingSession }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return { success: false, error: "Une erreur s'est produite. Veuillez réessayer." }
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("booking_session")
}

export async function getCurrentBooking(): Promise<BookingSession | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get("booking_session")

  if (!session) {
    return null
  }

  try {
    return JSON.parse(session.value)
  } catch {
    return null
  }
}
