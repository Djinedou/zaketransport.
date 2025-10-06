"use server"

import { cookies } from "next/headers"

export interface BookingSession {
  bookingId: string
  ticketNumber: string
  passengerName: string
  route: string
  date: string
  time: string
}

// Mock bookings database - in production, fetch from real database
const bookings: Record<string, BookingSession> = {
  "BK-2024-001": {
    bookingId: "BK-2024-001",
    ticketNumber: "BK-2024-001",
    passengerName: "Jean Kouassi",
    route: "Cotonou → Natitingou",
    date: "2024-01-20",
    time: "07:00",
  },
  "BK-2024-002": {
    bookingId: "BK-2024-002",
    ticketNumber: "BK-2024-002",
    passengerName: "Marie Dossou",
    route: "Natitingou → Cotonou",
    date: "2024-01-25",
    time: "20:00",
  },
  "BK-2024-003": {
    bookingId: "BK-2024-003",
    ticketNumber: "BK-2024-003",
    passengerName: "Paul Agbodjan",
    route: "Djougou → Cotonou",
    date: "2024-01-22",
    time: "07:00",
  },
}

export async function loginWithTicket(
  ticketNumber: string,
): Promise<{ success: boolean; error?: string; booking?: BookingSession }> {
  const booking = bookings[ticketNumber.toUpperCase()]

  if (!booking) {
    return { success: false, error: "Numéro de billet invalide. Veuillez vérifier votre numéro de réservation." }
  }

  // Set session cookie with booking info
  const cookieStore = await cookies()
  cookieStore.set("booking_session", JSON.stringify(booking), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return { success: true, booking }
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
