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
import { Plus, Edit, Trash2, Save, MapPin } from "lucide-react"

export function StopsManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStop, setEditingStop] = useState<any>(null)

  // Mock data
  const stops = [
    {
      id: "1",
      route: "Cotonou → Natitingou",
      stopCity: "Parakou",
      order: 1,
      arrivalOffset: 240,
      departureOffset: 255,
      duration: 15,
      active: true,
    },
    {
      id: "2",
      route: "Cotonou → Natitingou",
      stopCity: "Djougou",
      order: 2,
      arrivalOffset: 360,
      departureOffset: 375,
      duration: 15,
      active: true,
    },
    {
      id: "3",
      route: "Natitingou → Cotonou",
      stopCity: "Djougou",
      order: 1,
      arrivalOffset: 150,
      departureOffset: 165,
      duration: 15,
      active: true,
    },
  ]

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h${mins.toString().padStart(2, "0")}`
  }

  const handleEdit = (stop: any) => {
    setEditingStop(stop)
    setIsDialogOpen(true)
  }

  const handleNew = () => {
    setEditingStop(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Gestion des Arrêts</h2>
        <p className="text-muted-foreground">Gérez les arrêts intermédiaires sur chaque itinéraire</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Arrêts intermédiaires</CardTitle>
              <CardDescription>Tous les arrêts configurés par itinéraire</CardDescription>
            </div>
            <Button onClick={handleNew}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvel arrêt
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Itinéraire</TableHead>
                  <TableHead>Ville d'arrêt</TableHead>
                  <TableHead>Ordre</TableHead>
                  <TableHead>Temps depuis départ</TableHead>
                  <TableHead>Durée d'arrêt</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stops.map((stop) => (
                  <TableRow key={stop.id}>
                    <TableCell className="font-medium">{stop.route}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {stop.stopCity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">#{stop.order}</Badge>
                    </TableCell>
                    <TableCell>{formatTime(stop.arrivalOffset)}</TableCell>
                    <TableCell>{stop.duration} min</TableCell>
                    <TableCell>
                      <Badge variant={stop.active ? "default" : "secondary"}>{stop.active ? "Actif" : "Inactif"}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(stop)}>
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
            <DialogTitle>{editingStop ? "Modifier l'arrêt" : "Nouvel arrêt"}</DialogTitle>
            <DialogDescription>Configurez les détails de l'arrêt intermédiaire</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="route">Itinéraire</Label>
              <Select defaultValue={editingStop?.route}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un itinéraire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cotonou → Natitingou">Cotonou → Natitingou</SelectItem>
                  <SelectItem value="Natitingou → Cotonou">Natitingou → Cotonou</SelectItem>
                  <SelectItem value="Aledjo → Natitingou">Aledjo → Natitingou</SelectItem>
                  <SelectItem value="Natitingou → Aledjo">Natitingou → Aledjo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">Ville d'arrêt</Label>
              <Input id="city" defaultValue={editingStop?.stopCity} placeholder="Ex: Parakou" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order">Ordre de l'arrêt</Label>
              <Input id="order" type="number" defaultValue={editingStop?.order || 1} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="arrival">Temps d'arrivée (minutes depuis départ)</Label>
              <Input id="arrival" type="number" defaultValue={editingStop?.arrivalOffset} placeholder="Ex: 240" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Durée de l'arrêt (minutes)</Label>
              <Input id="duration" type="number" defaultValue={editingStop?.duration || 15} />
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
