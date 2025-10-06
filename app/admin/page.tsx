"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface Route {
  id: number
  origin: string
  destination: string
  price: number
}

interface Booking {
  id: number
  ticket_number: string
  passenger_name: string
  phone: string
  origin: string
  destination: string
  travel_date: string
  seat_number: number
  breakfast_choice: string
  status: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [routes, setRoutes] = useState<Route[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadRoutes = async () => {
    try {
      setError(null)
      const response = await fetch("/api/admin/routes")
      if (!response.ok) throw new Error("Failed to load routes")
      const data = await response.json()
      setRoutes(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("[v0] Error loading routes:", error)
      setError("Impossible de charger les routes")
      setRoutes([])
    }
  }

  const loadBookings = async () => {
    try {
      setError(null)
      const response = await fetch("/api/admin/bookings")
      if (!response.ok) throw new Error("Failed to load bookings")
      const data = await response.json()
      setBookings(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("[v0] Error loading bookings:", error)
      setError("Impossible de charger les réservations")
      setBookings([])
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadRoutes()
      loadBookings()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      setIsAuthenticated(true)
      toast.success("Connexion réussie")
    } else {
      toast.error("Mot de passe incorrect")
    }
  }

  const handleSaveRoute = async (routeId: number, price: string) => {
    setLoading(true)
    try {
      const route = routes.find((r) => r.id === routeId)
      if (!route) return

      const response = await fetch("/api/admin/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: routeId,
          origin: route.origin,
          destination: route.destination,
          price: Number.parseFloat(price),
        }),
      })

      if (response.ok) {
        toast.success("Prix mis à jour avec succès")
        await loadRoutes()
      } else {
        toast.error("Erreur lors de la mise à jour")
      }
    } catch (error) {
      console.error("[v0] Error saving route:", error)
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSetting = async (key: string, value: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      })

      if (response.ok) {
        toast.success("Paramètre enregistré avec succès")
      } else {
        toast.error("Erreur lors de la sauvegarde")
      }
    } catch (error) {
      console.error("[v0] Error saving setting:", error)
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connexion Administrateur</CardTitle>
            <CardDescription>Mot de passe: admin123</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                />
              </div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Tableau de Bord</h1>
          <Button onClick={() => setIsAuthenticated(false)} variant="outline" size="sm">
            Déconnexion
          </Button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">{error}</div>}

        <Tabs defaultValue="routes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
          </TabsList>

          <TabsContent value="routes">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Prix</CardTitle>
                <CardDescription>Modifier les tarifs des trajets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {routes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune route disponible</p>
                ) : (
                  routes.map((route) => (
                    <div
                      key={route.id}
                      className="flex flex-col sm:flex-row items-start sm:items-end gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex-1 w-full">
                        <Label className="text-sm font-medium">
                          {route.origin} → {route.destination}
                        </Label>
                        <Input
                          type="number"
                          id={`price-${route.id}`}
                          defaultValue={route.price}
                          placeholder="Prix en CFA"
                          className="mt-2"
                        />
                      </div>
                      <Button
                        onClick={() => {
                          const input = document.getElementById(`price-${route.id}`) as HTMLInputElement
                          if (input) handleSaveRoute(route.id, input.value)
                        }}
                        disabled={loading}
                        className="w-full sm:w-auto"
                      >
                        {loading ? "..." : "Enregistrer"}
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres Système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      id: "company-name",
                      label: "Nom de l'entreprise",
                      defaultValue: "Zake Transport",
                      key: "company_name",
                    },
                    { id: "company-phone", label: "Téléphone", defaultValue: "+229 XX XX XX XX", key: "company_phone" },
                    {
                      id: "company-email",
                      label: "Email",
                      defaultValue: "contact@zaketransport.com",
                      key: "company_email",
                    },
                  ].map((setting) => (
                    <div key={setting.id} className="space-y-2">
                      <Label htmlFor={setting.id}>{setting.label}</Label>
                      <div className="flex gap-2">
                        <Input id={setting.id} defaultValue={setting.defaultValue} className="flex-1" />
                        <Button
                          onClick={() => {
                            const input = document.getElementById(setting.id) as HTMLInputElement
                            if (input) handleSaveSetting(setting.key, input.value)
                          }}
                          disabled={loading}
                        >
                          {loading ? "..." : "Sauver"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Réservations</CardTitle>
                <CardDescription>{bookings.length} réservation(s)</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune réservation</p>
                ) : (
                  <div className="space-y-3">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="font-semibold">{booking.ticket_number}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {booking.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Passager:</span> {booking.passenger_name}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Téléphone:</span> {booking.phone}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Trajet:</span> {booking.origin} →{" "}
                            {booking.destination}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date:</span> {booking.travel_date}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Siège:</span> {booking.seat_number}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Petit-déj:</span> {booking.breakfast_choice}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
