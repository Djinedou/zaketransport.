"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bus, Package, Users, TrendingUp } from "lucide-react"

export function StatsOverview() {
  // Mock data - in production, fetch from database
  const stats = {
    todayBookings: 24,
    todayRevenue: 285000,
    activePackages: 12,
    totalPassengers: 156,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Vue d'ensemble</h2>
        <p className="text-muted-foreground">Statistiques en temps réel de vos opérations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations du jour</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayBookings}</div>
            <p className="text-xs text-muted-foreground">+12% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus du jour</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayRevenue.toLocaleString()} FCFA</div>
            <p className="text-xs text-muted-foreground">+8% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colis en transit</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activePackages}</div>
            <p className="text-xs text-muted-foreground">À livrer aujourd'hui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passagers ce mois</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPassengers}</div>
            <p className="text-xs text-muted-foreground">+23% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Prochains départs</CardTitle>
            <CardDescription>Départs prévus dans les prochaines heures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { route: "Cotonou → Natitingou", time: "07:00", seats: "32/40" },
                { route: "Djougou → Natitingou", time: "07:00", seats: "28/40" },
                { route: "Natitingou → Cotonou", time: "20:00", seats: "15/40" },
              ].map((departure, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{departure.route}</p>
                    <p className="text-sm text-muted-foreground">{departure.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{departure.seats}</p>
                    <p className="text-xs text-muted-foreground">places</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Dernières actions sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Nouvelle réservation", details: "Cotonou → Natitingou", time: "Il y a 5 min" },
                { action: "Colis livré", details: "Tracking: ZK-2024-001", time: "Il y a 15 min" },
                { action: "Paiement reçu", details: "15,000 FCFA", time: "Il y a 23 min" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
