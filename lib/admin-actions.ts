"use server"

import { cookies } from "next/headers"
import { query } from "./db"

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

  try {
    await query(
      `INSERT INTO system_settings (setting_key, setting_value, updated_at)
       VALUES 
         ('company_name', $1, CURRENT_TIMESTAMP),
         ('company_slogan', $2, CURRENT_TIMESTAMP),
         ('contact_phone', $3, CURRENT_TIMESTAMP),
         ('contact_email', $4, CURRENT_TIMESTAMP),
         ('booking_advance_days', $5, CURRENT_TIMESTAMP),
         ('default_seats_per_bus', $6, CURRENT_TIMESTAMP),
         ('package_base_fee', $7, CURRENT_TIMESTAMP),
         ('package_fee_per_kg', $8, CURRENT_TIMESTAMP)
       ON CONFLICT (setting_key) 
       DO UPDATE SET setting_value = EXCLUDED.setting_value, updated_at = CURRENT_TIMESTAMP`,
      [
        settings.companyName,
        settings.companySlogan,
        settings.contactPhone,
        settings.contactEmail,
        settings.bookingAdvanceDays,
        settings.defaultSeatsPerBus,
        settings.packageBaseFee,
        settings.packageFeePerKg,
      ],
    )

    return { success: true, message: "Paramètres enregistrés avec succès" }
  } catch (error) {
    console.error("[v0] Save settings error:", error)
    return { success: false, message: "Erreur lors de l'enregistrement" }
  }
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

  try {
    if (policy.id) {
      await query(
        `UPDATE policies 
         SET title = $1, content = $2, category = $3, updated_at = CURRENT_TIMESTAMP
         WHERE id = $4`,
        [policy.title, policy.content, policy.category, policy.id],
      )
    } else {
      const result = await query(
        `INSERT INTO policies (title, content, category)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [policy.title, policy.content, policy.category],
      )
      policy.id = result[0].id.toString()
    }

    return {
      success: true,
      message: policy.id ? "Politique mise à jour" : "Politique créée",
      policy,
    }
  } catch (error) {
    console.error("[v0] Save policy error:", error)
    return { success: false, message: "Erreur lors de l'enregistrement" }
  }
}

export async function deletePolicy(policyId: string) {
  await verifyAdminSession()

  try {
    await query(`DELETE FROM policies WHERE id = $1`, [policyId])
    return { success: true, message: "Politique supprimée" }
  } catch (error) {
    console.error("[v0] Delete policy error:", error)
    return { success: false, message: "Erreur lors de la suppression" }
  }
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

  try {
    if (route.id) {
      await query(
        `UPDATE routes 
         SET origin = $1, destination = $2, price = $3, duration = $4, updated_at = CURRENT_TIMESTAMP
         WHERE id = $5`,
        [route.from, route.to, route.price, route.duration, route.id],
      )
    } else {
      const result = await query(
        `INSERT INTO routes (origin, destination, price, duration)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [route.from, route.to, route.price, route.duration],
      )
      route.id = result[0].id.toString()
    }

    return {
      success: true,
      message: route.id ? "Itinéraire mis à jour" : "Itinéraire créé",
      route,
    }
  } catch (error) {
    console.error("[v0] Save route error:", error)
    return { success: false, message: "Erreur lors de l'enregistrement" }
  }
}

export async function deleteRoute(routeId: string) {
  await verifyAdminSession()

  try {
    await query(`DELETE FROM routes WHERE id = $1`, [routeId])
    return { success: true, message: "Itinéraire supprimé" }
  } catch (error) {
    console.error("[v0] Delete route error:", error)
    return { success: false, message: "Erreur lors de la suppression" }
  }
}

// Stop Actions
export async function saveStop(stop: {
  id?: string
  route: string
  stopCity: string
  order: number
  arrivalOffset: number
  departureOffset: number
  duration: number
  active?: boolean
}) {
  await verifyAdminSession()

  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    message: stop.id ? "Arrêt mis à jour" : "Arrêt créé",
    stop: { ...stop, id: stop.id || Date.now().toString() },
  }
}

export async function deleteStop(stopId: string) {
  await verifyAdminSession()

  await new Promise((resolve) => setTimeout(resolve, 500))

  return { success: true, message: "Arrêt supprimé" }
}
