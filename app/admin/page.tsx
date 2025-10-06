"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export const dynamic = "force-dynamic"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // Routes state
  const [routes, setRoutes] = useState<any[]>([])
  const [loadingRoutes, setLoadingRoutes] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    company_name: "",
    phone: "",
    email: "",
    address: "",
  })
  const [loadingSettings, setLoadingSettings] = useState(false)

  // Bookings state
  const [bookings, setBookings] = useState<any[]>([])
  const [loadingBookings, setLoadingBookings] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      setIsLoggedIn(true)
      toast.success("Connexion réussie")
      loadAllData()
    } else {
      toast.error("Mot de passe incorrect")
    }
  }

  const loadAllData = async () => {
    await Promise.all([fetchRoutes(), fetchSettings(), fetchBookings()])
  }

  const fetchRoutes = async () => {
    setLoadingRoutes(true)
    try {
      const res = await fetch("/api/admin/routes")
      if (res.ok) {
        const data = await res.json()
        setRoutes(data)
      }
    } catch (error) {
      console.error("Error fetching routes:", error)
    } finally {
      setLoadingRoutes(false)
    }
  }

  const fetchSettings = async () => {
    setLoadingSettings(true)
    try {
      const res = await fetch("/api/admin/settings")
      if (res.ok) {
        const data = await res.json()
        if (data.length > 0) {
          setSettings(data[0])
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoadingSettings(false)
    }
  }

  const fetchBookings = async () => {
    setLoadingBookings(true)
    try {
      const res = await fetch("/api/admin/bookings")
      if (res.ok) {
        const data = await res.json()
        setBookings(data)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoadingBookings(false)
    }
  }

  const updateRoutePrice = async (routeId: number, newPrice: number) => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/routes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: routeId, price: newPrice }),
      })

      if (res.ok) {
        toast.success("Prix mis à jour")
        await fetchRoutes()
      } else {
        toast.error("Erreur lors de la mise à jour")
      }
    } catch (error) {
      toast.error("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        toast.success("Paramètres enregistrés")
      } else {
        toast.error("Erreur lors de l'enregistrement")
      }
    } catch (error) {
      toast.error("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connexion Administrateur</CardTitle>
            <CardDescription>Entrez le mot de passe pour accéder au panneau d'administration</CardDescription>
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
          <h1 className="text-3xl font-bold">Panneau d'Administration</h1>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
            Déconnexion
          </Button>
        </div>

        <Tabs defaultValue="routes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
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
              <CardContent>
                {loadingRoutes ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : routes.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Aucune route trouvée</p>
                ) : (
                  <div className="space-y-4">
                    {routes.map((route) => (
                      <div key={route.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold">
                            {route.origin} → {route.destination}
                          </p>
                          <p className="text-sm text-gray-500">Prix actuel: {route.price} CFA</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input type="number" defaultValue={route.price} className="w-32" id={`price-${route.id}`} />
                          <Button
                            onClick={() => {
                              const input = document.getElementById(`price-${route.id}`) as HTMLInputElement
                              updateRoutePrice(route.id, Number.parseInt(input.value))
                            }}
                            disabled={loading}
                          >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Mettre à jour"}
                          </Button>
                        </div>
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
                <CardDescription>Configurer les informations de l'entreprise</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSettings ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company_name">Nom de l'entreprise</Label>
                      <Input
                        id="company_name"
                        value={settings.company_name}
                        onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      />
                    </div>
                    <Button onClick={saveSettings} disabled={loading} className="w-full">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Enregistrer les paramètres
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Réservations</CardTitle>
                <CardDescription>Liste de toutes les réservations</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingBookings ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : bookings.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Aucune réservation trouvée</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p>
                            <span className="font-semibold">Ticket:</span> {booking.ticket_number}
                          </p>
                          <p>
                            <span className="font-semibold">Passager:</span> {booking.passenger_name}
                          </p>
                          <p>
                            <span className="font-semibold">Téléphone:</span> {booking.phone}
                          </p>
                          <p>
                            <span className="font-semibold">Siège:</span> {booking.seat_number}
                          </p>
                          <p>
                            <span className="font-semibold">Date:</span>{" "}
                            {new Date(booking.travel_date).toLocaleDateString()}
                          </p>
                          <p>
                            <span className="font-semibold">Statut:</span> {booking.status}
                          </p>
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
