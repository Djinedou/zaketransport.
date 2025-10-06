"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye } from "lucide-react"

export function BookingsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data - in production, fetch from database
  const bookings = [
    {
      id: "BK-2024-001",
      passenger: "Jean Kouassi",
      phone: "+229 97 XX XX XX",
      route: "Cotonou → Natitingou",
      date: "2024-01-15",
      time: "07:00",
      seat: "A12",
      payment: "MTN Mobile Money",
      status: "confirmed",
      price: 15000,
    },
    {
      id: "BK-2024-002",
      passenger: "Marie Dossou",
      phone: "+229 96 XX XX XX",
      route: "Djougou → Natitingou",
      date: "2024-01-15",
      time: "20:00",
      seat: "B05",
      payment: "Moov Pay",
      status: "confirmed",
      price: 5000,
    },
    {
      id: "BK-2024-003",
      passenger: "Paul Agbodjan",
      phone: "+229 95 XX XX XX",
      route: "Natitingou → Cotonou",
      date: "2024-01-16",
      time: "07:00",
      seat: "C08",
      payment: "Celtis",
      status: "pending",
      price: 15000,
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      confirmed: "default",
      pending: "secondary",
      cancelled: "destructive",
    }
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Gestion des Réservations</h2>
        <p className="text-muted-foreground">Gérez toutes les réservations de billets</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Liste des réservations</CardTitle>
              <CardDescription>Toutes les réservations effectuées</CardDescription>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, téléphone ou référence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="confirmed">Confirmé</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Passager</TableHead>
                  <TableHead>Itinéraire</TableHead>
                  <TableHead>Date/Heure</TableHead>
                  <TableHead>Siège</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.passenger}</p>
                        <p className="text-sm text-muted-foreground">{booking.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.route}</TableCell>
                    <TableCell>
                      <div>
                        <p>{booking.date}</p>
                        <p className="text-sm text-muted-foreground">{booking.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.seat}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{booking.payment}</p>
                        <p className="text-sm font-medium">{booking.price.toLocaleString()} FCFA</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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
