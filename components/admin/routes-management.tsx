"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Save, Loader2 } from "lucide-react"
import { saveRoute, deleteRoute, getRoutes } from "@/lib/admin-actions"
import { toast } from "sonner"

export function RoutesManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRoute, setEditingRoute] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [routes, setRoutes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRoutes()
  }, [])

  const loadRoutes = async () => {
    setIsLoading(true)
    try {
      const result = await getRoutes()
      if (result.success) {
        const formattedRoutes = result.routes.map((r: any) => ({
          id: r.id.toString(),
          from: r.from,
          to: r.to,
          price: Number(r.price),
          duration: r.duration,
          active: true,
          departures: ["07:00", "20:00"],
        }))
        setRoutes(formattedRoutes)
      }
    } catch (error) {
      console.error("[v0] Load routes error:", error)
      toast.error("Erreur lors du chargement des itinéraires")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (route: any) => {
    setEditingRoute(route)
    setIsDialogOpen(true)
  }

  const handleNew = () => {
    setEditingRoute(null)
    setIsDialogOpen(true)
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    const formData = new FormData(e.currentTarget)
    const routeData = {
      id: editingRoute?.id,
      from: formData.get("from") as string,
      to: formData.get("to") as string,
      price: Number(formData.get("price")),
      duration: formData.get("duration") as string,
      departures: (formData.get("departures") as string).split(",").map((t) => t.trim()),
      active: true,
    }

    try {
      const result = await saveRoute(routeData)
      if (result.success) {
        toast.success(result.message)
        await loadRoutes()
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (routeId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet itinéraire ?")) return

    try {
      const result = await deleteRoute(routeId)
      if (result.success) {
        toast.success(result.message)
        await loadRoutes()
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    }
  }

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
            <Button onClick={handleNew}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvel itinéraire
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : routes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Aucun itinéraire trouvé. Créez-en un nouveau.</div>
          ) : (
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
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(route)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(route.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingRoute ? "Modifier l'itinéraire" : "Nouvel itinéraire"}</DialogTitle>
              <DialogDescription>Configurez les détails de l'itinéraire</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="from">Ville de départ</Label>
                <Input id="from" name="from" defaultValue={editingRoute?.from} placeholder="Ex: Cotonou" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="to">Ville d'arrivée</Label>
                <Input id="to" name="to" defaultValue={editingRoute?.to} placeholder="Ex: Natitingou" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Prix (FCFA)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={editingRoute?.price}
                  placeholder="Ex: 7000"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Durée du trajet</Label>
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={editingRoute?.duration}
                  placeholder="Ex: 8h30"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="departures">Horaires de départ (séparés par des virgules)</Label>
                <Input
                  id="departures"
                  name="departures"
                  defaultValue={editingRoute?.departures.join(", ")}
                  placeholder="Ex: 07:00, 20:00"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
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
