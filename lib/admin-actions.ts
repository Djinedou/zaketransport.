"use server"

import { cookies } from "next/headers"

// Helper to verify admin session
async function verifyAdminSession() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get("admin_session")

  if (!adminSession || adminSession.value !== "admin_authenticated") {
    throw new Error("Non autorisé")
  }
}

// System Settings Actions
export async function saveSystemSettings(settings: {
  companyName: string
  companySlogan: string
  contactPhone: string
  contactEmail: string
  bookingAdvanceDays: string
  defaultSeatsPerBus: string
  packageBaseFee: string
  packageFeePerKg: string
}) {
  await verifyAdminSession()

  // In a real app, save to database
  // For now, we'll simulate a successful save
  await new Promise((resolve) => setTimeout(resolve, 500))

  return { success: true, message: "Paramètres enregistrés avec succès" }
}

// Policy Actions
export async function savePolicy(policy: {
  id?: string
  key?: string
  title: string
  content: string
  category: string
  order: number
  active?: boolean
}) {
  await verifyAdminSession()

  // In a real app, save to database
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    message: policy.id ? "Politique mise à jour" : "Politique créée",
    policy: { ...policy, id: policy.id || Date.now().toString() },
  }
}

export async function deletePolicy(policyId: string) {
  await verifyAdminSession()

  await new Promise((resolve) => setTimeout(resolve, 500))

  return { success: true, message: "Politique supprimée" }
}

// Schedule Actions
export async function saveSchedule(schedule: {
  id?: string
  route: string
  departureTime: string
  availableSeats: number
  active?: boolean
}) {
  await verifyAdminSession()

  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    message: schedule.id ? "Horaire mis à jour" : "Horaire créé",
    schedule: { ...schedule, id: schedule.id || Date.now().toString() },
  }
}

export async function deleteSchedule(scheduleId: string) {
  await verifyAdminSession()

  await new Promise((resolve) => setTimeout(resolve, 500))

  return { success: true, message: "Horaire supprimé" }
}

// Route Actions
export async function saveRoute(route: {
  id?: string
  from: string
  to: string
  price: number
  duration: string
  departures: string[]
  active?: boolean
}) {
  await verifyAdminSession()

  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    message: route.id ? "Itinéraire mis à jour" : "Itinéraire créé",
    route: { ...route, id: route.id || Date.now().toString() },
  }
}

export async function deleteRoute(routeId: string) {
  await verifyAdminSession()

  await new Promise((resolve) => setTimeout(resolve, 500))

  return { success: true, message: "Itinéraire supprimé" }
}
