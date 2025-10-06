"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity, Search, Download, Filter } from "lucide-react"

export function ActivityMonitor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Mock data
  const activities = [
    {
      id: "1",
      timestamp: "2025-01-10 14:32:15",
      user: "admin@zaketransport.bj",
      role: "admin",
      action: "update",
      entity: "policy",
      description: "Modifié la politique 'Heure d'embarquement'",
      ipAddress: "192.168.1.100",
    },
    {
      id: "2",
      timestamp: "2025-01-10 14:28:42",
      user: "jean.dupont@email.com",
      role: "customer",
      action: "create",
      entity: "booking",
      description: "Nouvelle réservation #BK-2025-001234",
      ipAddress: "41.85.123.45",
    },
    {
      id: "3",
      timestamp: "2025-01-10 14:15:30",
      user: "admin@zaketransport.bj",
      role: "admin",
      action: "create",
      entity: "route",
      description: "Ajouté nouvel itinéraire Cotonou → Parakou",
      ipAddress: "192.168.1.100",
    },
    {
      id: "4",
      timestamp: "2025-01-10 13:45:18",
      user: "marie.kouassi@email.com",
      role: "customer",
      action: "create",
      entity: "package",
      description: "Nouveau colis #PKG-2025-000567",
      ipAddress: "41.85.234.67",
    },
    {
      id: "5",
      timestamp: "2025-01-10 13:30:05",
      user: "admin@zaketransport.bj",
      role: "admin",
      action: "delete",
      entity: "schedule",
      description: "Supprimé horaire 15:00 pour Cotonou → Natitingou",
      ipAddress: "192.168.1.100",
    },
  ]

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "default"
      case "update":
        return "secondary"
      case "delete":
        return "destructive"
      case "login":
        return "outline"
      default:
        return "outline"
    }
  }

  const getEntityIcon = (entity: string) => {
    return entity.charAt(0).toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Moniteur d'Activité</h2>
        <p className="text-muted-foreground">Suivez toutes les actions effectuées sur la plateforme</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Journal d'activité</CardTitle>
              <CardDescription>Historique complet des actions</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans l'activité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Type d'action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les actions</SelectItem>
                <SelectItem value="create">Créations</SelectItem>
                <SelectItem value="update">Modifications</SelectItem>
                <SelectItem value="delete">Suppressions</SelectItem>
                <SelectItem value="login">Connexions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-mono text-sm">{activity.timestamp}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">{activity.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getActionColor(activity.action)}>{activity.action}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-medium">
                          {getEntityIcon(activity.entity)}
                        </div>
                        {activity.entity}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">{activity.description}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{activity.ipAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions aujourd'hui</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Connectés actuellement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modifications admin</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
