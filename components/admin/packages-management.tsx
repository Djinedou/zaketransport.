"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, MapPin } from "lucide-react"

export function PackagesManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  const packages = [
    {
      tracking: "ZK-2024-001",
      sender: "Kofi Mensah",
      recipient: "Ama Yeboah",
      from: "Cotonou",
      to: "Natitingou",
      status: "in_transit",
      location: "Djougou",
      fee: 3500,
      date: "2024-01-15",
    },
    {
      tracking: "ZK-2024-002",
      sender: "Yao Koffi",
      recipient: "Akossiwa Doe",
      from: "Natitingou",
      to: "Cotonou",
      status: "delivered",
      location: "Cotonou",
      fee: 3500,
      date: "2024-01-14",
    },
    {
      tracking: "ZK-2024-003",
      sender: "Edem Agbeko",
      recipient: "Sena Kpogo",
      from: "Aledjo",
      to: "Natitingou",
      status: "pending",
      location: "Aledjo",
      fee: 2000,
      date: "2024-01-15",
    },
  ]

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
      pending: { label: "En attente", variant: "secondary" },
      in_transit: { label: "En transit", variant: "default" },
      delivered: { label: "Livré", variant: "default" },
      cancelled: { label: "Annulé", variant: "destructive" },
    }
    const { label, variant } = config[status] || { label: status, variant: "default" }
    return <Badge variant={variant}>{label}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Gestion des Colis</h2>
        <p className="text-muted-foreground">Suivez et gérez tous les colis en transit</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Liste des colis</CardTitle>
              <CardDescription>Tous les colis enregistrés dans le système</CardDescription>
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
                placeholder="Rechercher par numéro de suivi..."
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
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="in_transit">En transit</SelectItem>
                <SelectItem value="delivered">Livré</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro de suivi</TableHead>
                  <TableHead>Expéditeur</TableHead>
                  <TableHead>Destinataire</TableHead>
                  <TableHead>Itinéraire</TableHead>
                  <TableHead>Position actuelle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Frais</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.tracking}>
                    <TableCell className="font-medium">{pkg.tracking}</TableCell>
                    <TableCell>{pkg.sender}</TableCell>
                    <TableCell>{pkg.recipient}</TableCell>
                    <TableCell>
                      {pkg.from} → {pkg.to}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {pkg.location}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(pkg.status)}</TableCell>
                    <TableCell>{pkg.fee.toLocaleString()} FCFA</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Mettre à jour
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
