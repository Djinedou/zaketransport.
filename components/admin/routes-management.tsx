"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"

export function RoutesManagement() {
  // Mock data
  const routes = [
    {
      id: "1",
      from: "Cotonou",
      to: "Natitingou",
      price: 15000,
      duration: "8h30",
      active: true,
      departures: ["07:00", "20:00"],
    },
    {
      id: "2",
      from: "Natitingou",
      to: "Cotonou",
      price: 15000,
      duration: "8h30",
      active: true,
      departures: ["07:00", "20:00"],
    },
    {
      id: "3",
      from: "Aledjo",
      to: "Natitingou",
      price: 8000,
      duration: "4h00",
      active: true,
      departures: ["07:00", "20:00"],
    },
    {
      id: "4",
      from: "Natitingou",
      to: "Aledjo",
      price: 8000,
      duration: "4h00",
      active: true,
      departures: ["07:00", "20:00"],
    },
    {
      id: "5",
      from: "Djougou",
      to: "Natitingou",
      price: 5000,
      duration: "2h30",
      active: true,
      departures: ["07:00", "20:00"],
    },
    {
      id: "6",
      from: "Natitingou",
      to: "Djougou",
      price: 5000,
      duration: "2h30",
      active: true,
      departures: ["07:00", "20:00"],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Gestion des Itinéraires</h2>
        <p className="text-muted-foreground">Gérez les routes, horaires et tarifs</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Liste des itinéraires</CardTitle>
              <CardDescription>Tous les itinéraires disponibles</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvel itinéraire
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Départ</TableHead>
                  <TableHead>Arrivée</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Horaires</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">{route.from}</TableCell>
                    <TableCell className="font-medium">{route.to}</TableCell>
                    <TableCell>{route.price.toLocaleString()} FCFA</TableCell>
                    <TableCell>{route.duration}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {route.departures.map((time) => (
                          <Badge key={time} variant="outline">
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={route.active ? "default" : "secondary"}>
                        {route.active ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
