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

  const loadRoutes = async () => {
    try {
      const response = await fetch("/api/admin/routes")
      const data = await response.json()
      setRoutes(data)
    } catch (error) {
      console.error("[v0] Error loading routes:", error)
      toast.error("Erreur de chargement des routes")
    }
  }

  const loadBookings = async () => {
    try {
      const response = await fetch("/api/admin/bookings")
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error("[v0] Error loading bookings:", error)
      toast.error("Erreur de chargement des réservations")
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
        loadRoutes()
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
            <CardDescription>Entrez votre mot de passe</CardDescription>
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tableau de Bord Administrateur</h1>
          <Button onClick={() => setIsAuthenticated(false)} variant="outline">
            Déconnexion
          </Button>
        </div>

        <Tabs defaultValue="routes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="routes">Routes & Prix</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
          </TabsList>

          <TabsContent value="routes">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Routes et Prix</CardTitle>
                <CardDescription>Modifier les prix des trajets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {routes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Chargement des routes...</p>
                ) : (
                  <div className="space-y-4">
                    {routes.map((route) => (
                      <div key={route.id} className="flex items-end gap-4">
                        <div className="flex-1">
                          <Label>
                            {route.origin} → {route.destination}
                          </Label>
                          <Input
                            type="number"
                            id={`price-${route.id}`}
                            defaultValue={route.price}
                            placeholder="Prix en CFA"
                          />
                        </div>
                        <Button
                          onClick={() => {
                            const input = document.getElementById(`price-${route.id}`) as HTMLInputElement
                            handleSaveRoute(route.id, input.value)
                          }}
                          disabled={loading}
                        >
                          Enregistrer
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres Système</CardTitle>
                <CardDescription>Configuration générale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Nom de l'entreprise</Label>
                    <div className="flex gap-2">
                      <Input id="company-name" defaultValue="Zake Transport" />
                      <Button
                        onClick={() => {
                          const input = document.getElementById("company-name") as HTMLInputElement
                          handleSaveSetting("company_name", input.value)
                        }}
                        disabled={loading}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company-phone">Téléphone</Label>
                    <div className="flex gap-2">
                      <Input id="company-phone" defaultValue="+229 XX XX XX XX" />
                      <Button
                        onClick={() => {
                          const input = document.getElementById("company-phone") as HTMLInputElement
                          handleSaveSetting("company_phone", input.value)
                        }}
                        disabled={loading}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company-email">Email</Label>
                    <div className="flex gap-2">
                      <Input id="company-email" defaultValue="contact@zaketransport.com" />
                      <Button
                        onClick={() => {
                          const input = document.getElementById("company-email") as HTMLInputElement
                          handleSaveSetting("company_email", input.value)
                        }}
                        disabled={loading}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Réservations Récentes</CardTitle>
                <CardDescription>Liste des dernières réservations</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune réservation pour le moment.</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-semibold">Ticket:</span> {booking.ticket_number}
                          </div>
                          <div>
                            <span className="font-semibold">Passager:</span> {booking.passenger_name}
                          </div>
                          <div>
                            <span className="font-semibold">Trajet:</span> {booking.origin} → {booking.destination}
                          </div>
                          <div>
                            <span className="font-semibold">Date:</span> {booking.travel_date}
                          </div>
                          <div>
                            <span className="font-semibold">Siège:</span> {booking.seat_number}
                          </div>
                          <div>
                            <span className="font-semibold">Petit-déjeuner:</span> {booking.breakfast_choice}
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
