"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Save, Clock } from "lucide-react"

export function SchedulesManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<any>(null)

  // Mock data
  const schedules = [
    {
      id: "1",
      route: "Cotonou → Natitingou",
      departureTime: "07:00",
      availableSeats: 40,
      active: true,
    },
    {
      id: "2",
      route: "Cotonou → Natitingou",
      departureTime: "20:00",
      availableSeats: 40,
      active: true,
    },
    {
      id: "3",
      route: "Natitingou → Cotonou",
      departureTime: "07:00",
      availableSeats: 40,
      active: true,
    },
    {
      id: "4",
      route: "Natitingou → Cotonou",
      departureTime: "20:00",
      availableSeats: 40,
      active: true,
    },
  ]

  const handleEdit = (schedule: any) => {
    setEditingSchedule(schedule)
    setIsDialogOpen(true)
  }

  const handleNew = () => {
    setEditingSchedule(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Gestion des Horaires</h2>
        <p className="text-muted-foreground">Gérez les heures de départ et la disponibilité des sièges</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Horaires de départ</CardTitle>
              <CardDescription>Tous les horaires configurés</CardDescription>
            </div>
            <Button onClick={handleNew}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvel horaire
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Itinéraire</TableHead>
                  <TableHead>Heure de départ</TableHead>
                  <TableHead>Sièges disponibles</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">{schedule.route}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {schedule.departureTime}
                      </div>
                    </TableCell>
                    <TableCell>{schedule.availableSeats} sièges</TableCell>
                    <TableCell>
                      <Badge variant={schedule.active ? "default" : "secondary"}>
                        {schedule.active ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(schedule)}>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSchedule ? "Modifier l'horaire" : "Nouvel horaire"}</DialogTitle>
            <DialogDescription>Configurez les détails de l'horaire de départ</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="route">Itinéraire</Label>
              <Select defaultValue={editingSchedule?.route}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un itinéraire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cotonou → Natitingou">Cotonou → Natitingou</SelectItem>
                  <SelectItem value="Natitingou → Cotonou">Natitingou → Cotonou</SelectItem>
                  <SelectItem value="Aledjo → Natitingou">Aledjo → Natitingou</SelectItem>
                  <SelectItem value="Natitingou → Aledjo">Natitingou → Aledjo</SelectItem>
                  <SelectItem value="Djougou → Natitingou">Djougou → Natitingou</SelectItem>
                  <SelectItem value="Natitingou → Djougou">Natitingou → Djougou</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Heure de départ</Label>
              <Input id="time" type="time" defaultValue={editingSchedule?.departureTime} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="seats">Nombre de sièges</Label>
              <Input id="seats" type="number" defaultValue={editingSchedule?.availableSeats || 40} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
