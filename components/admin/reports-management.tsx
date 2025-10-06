"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, CheckCircle, XCircle } from "lucide-react"

export function ReportsManagement() {
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [adminNotes, setAdminNotes] = useState("")

  // Mock data
  const reports = [
    {
      id: "RPT-001",
      reporter: "Anonyme",
      phone: "+229 97 XX XX XX",
      staffName: "Chauffeur Koffi",
      type: "Retard",
      description: "Le bus est parti avec 45 minutes de retard sans explication",
      route: "Cotonou → Natitingou",
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: "RPT-002",
      reporter: "Marie Dossou",
      phone: "+229 96 XX XX XX",
      staffName: "Agent Mensah",
      type: "Service client",
      description: "Agent très impoli lors de l'embarquement",
      route: "Djougou → Natitingou",
      date: "2024-01-13",
      status: "investigating",
    },
  ]

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
      pending: { label: "En attente", variant: "secondary" },
      investigating: { label: "En cours", variant: "default" },
      resolved: { label: "Résolu", variant: "default" },
      dismissed: { label: "Rejeté", variant: "destructive" },
    }
    const { label, variant } = config[status] || { label: status, variant: "default" }
    return <Badge variant={variant}>{label}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Signalements du Personnel</h2>
        <p className="text-muted-foreground">Gérez les rapports d'incidents et de comportements</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des signalements</CardTitle>
          <CardDescription>Tous les signalements reçus des passagers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Rapporteur</TableHead>
                  <TableHead>Personnel concerné</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Itinéraire</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{report.reporter}</p>
                        <p className="text-sm text-muted-foreground">{report.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{report.staffName}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.route}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedReport(report)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Détails du signalement - {report.id}</DialogTitle>
                            <DialogDescription>Examinez et traitez ce signalement</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Rapporteur</p>
                                <p className="font-medium">{report.reporter}</p>
                                <p className="text-sm text-muted-foreground">{report.phone}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Personnel concerné</p>
                                <p className="font-medium">{report.staffName}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Type d'incident</p>
                                <p className="font-medium">{report.type}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Itinéraire</p>
                                <p className="font-medium">{report.route}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                              <p className="text-sm leading-relaxed">{report.description}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">Notes administratives</p>
                              <Textarea
                                placeholder="Ajoutez vos notes ici..."
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                rows={4}
                              />
                            </div>
                            <div className="flex gap-3">
                              <Button className="flex-1">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Marquer comme résolu
                              </Button>
                              <Button variant="outline" className="flex-1 bg-transparent">
                                <XCircle className="h-4 w-4 mr-2" />
                                Rejeter
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
