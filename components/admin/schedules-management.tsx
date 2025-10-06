"use client"

import type React from "react"

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
import { Plus, Edit, Trash2, Save, Clock, Loader2 } from "lucide-react"
import { saveSchedule, deleteSchedule } from "@/lib/admin-actions"
import { toast } from "sonner"

export function SchedulesManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

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

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const scheduleData = {
      id: editingSchedule?.id,
      route: formData.get("route") as string,
      departureTime: formData.get("time") as string,
      availableSeats: Number.parseInt(formData.get("seats") as string),
      active: true,
    }

    try {
      const result = await saveSchedule(scheduleData)
      if (result.success) {
        toast.success(result.message)
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de l'horaire")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (scheduleId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet horaire ?")) {
      return
    }

    setDeletingId(scheduleId)
    try {
      const result = await deleteSchedule(scheduleId)
      if (result.success) {
        toast.success(result.message)
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'horaire")
    } finally {
      setDeletingId(null)
    }
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(schedule.id)}
                          disabled={deletingId === schedule.id}
                        >
                          {deletingId === schedule.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
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
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="route">Itinéraire</Label>
                <Select name="route" defaultValue={editingSchedule?.route} required>
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
                <Input id="time" name="time" type="time" defaultValue={editingSchedule?.departureTime} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="seats">Nombre de sièges</Label>
                <Input
                  id="seats"
                  name="seats"
                  type="number"
                  defaultValue={editingSchedule?.availableSeats || 40}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
