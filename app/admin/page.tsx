"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      setIsAuthenticated(true)
      toast.success("Connexion réussie")
    } else {
      toast.error("Mot de passe incorrect")
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cotonou → Djougou</Label>
                    <Input type="number" defaultValue="6000" placeholder="Prix en CFA" />
                  </div>
                  <div>
                    <Label>Cotonou → Aledjo</Label>
                    <Input type="number" defaultValue="6000" placeholder="Prix en CFA" />
                  </div>
                  <div>
                    <Label>Cotonou → Natitingou</Label>
                    <Input type="number" defaultValue="7000" placeholder="Prix en CFA" />
                  </div>
                  <div>
                    <Label>Natitingou → Cotonou</Label>
                    <Input type="number" defaultValue="7000" placeholder="Prix en CFA" />
                  </div>
                </div>
                <Button onClick={() => toast.success("Prix mis à jour avec succès")}>Enregistrer les prix</Button>
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
                <div>
                  <Label>Nom de l'entreprise</Label>
                  <Input defaultValue="Zake Transport" />
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <Input defaultValue="+229 XX XX XX XX" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input defaultValue="contact@zaketransport.com" />
                </div>
                <Button onClick={() => toast.success("Paramètres enregistrés")}>Enregistrer</Button>
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
                <p className="text-sm text-muted-foreground">
                  Les réservations s'afficheront ici une fois que des clients auront réservé des billets.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
