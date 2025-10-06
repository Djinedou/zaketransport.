"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Edit, Trash2, Save, Loader2 } from "lucide-react"
import { savePolicy, deletePolicy } from "@/lib/admin-actions"
import { toast } from "sonner"

export function PoliciesManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Mock data
  const policies = [
    {
      id: "1",
      key: "boarding_time",
      title: "Heure d'embarquement",
      content: "Les passagers doivent se présenter 30 minutes avant l'heure de départ.",
      category: "boarding",
      active: true,
      order: 1,
    },
    {
      id: "2",
      key: "id_requirement",
      title: "Pièce d'identité obligatoire",
      content: "Tout passager doit présenter une pièce d'identité valide lors de l'embarquement.",
      category: "boarding",
      active: true,
      order: 2,
    },
    {
      id: "3",
      key: "luggage_cabin",
      title: "Bagages à main",
      content: "Chaque passager a droit à un bagage à main de maximum 5 kg.",
      category: "luggage",
      active: true,
      order: 3,
    },
  ]

  const handleEdit = (policy: any) => {
    setEditingPolicy(policy)
    setIsDialogOpen(true)
  }

  const handleNew = () => {
    setEditingPolicy(null)
    setIsDialogOpen(true)
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const policyData = {
      id: editingPolicy?.id,
      key: editingPolicy?.key,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      order: Number.parseInt(formData.get("order") as string),
      active: true,
    }

    try {
      const result = await savePolicy(policyData)
      if (result.success) {
        toast.success(result.message)
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de la politique")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (policyId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette politique ?")) {
      return
    }

    setDeletingId(policyId)
    try {
      const result = await deletePolicy(policyId)
      if (result.success) {
        toast.success(result.message)
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de la politique")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Gestion des Politiques</h2>
        <p className="text-muted-foreground">Modifiez les règles et politiques de la compagnie</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Politiques de la compagnie</CardTitle>
              <CardDescription>Gérez toutes les règles et conditions</CardDescription>
            </div>
            <Button onClick={handleNew}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle politique
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordre</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Contenu</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.order}</TableCell>
                    <TableCell className="font-medium">{policy.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{policy.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-md truncate">{policy.content}</TableCell>
                    <TableCell>
                      <Badge variant={policy.active ? "default" : "secondary"}>
                        {policy.active ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(policy)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(policy.id)}
                          disabled={deletingId === policy.id}
                        >
                          {deletingId === policy.id ? (
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPolicy ? "Modifier la politique" : "Nouvelle politique"}</DialogTitle>
            <DialogDescription>Modifiez les détails de la politique de la compagnie</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titre</Label>
                <Input id="title" name="title" defaultValue={editingPolicy?.title} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select name="category" defaultValue={editingPolicy?.category} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boarding">Embarquement</SelectItem>
                    <SelectItem value="luggage">Bagages</SelectItem>
                    <SelectItem value="payment">Paiement</SelectItem>
                    <SelectItem value="cancellation">Annulation</SelectItem>
                    <SelectItem value="general">Général</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Contenu</Label>
                <Textarea
                  id="content"
                  name="content"
                  rows={6}
                  defaultValue={editingPolicy?.content}
                  placeholder="Décrivez la politique en détail..."
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order">Ordre d'affichage</Label>
                <Input id="order" name="order" type="number" defaultValue={editingPolicy?.order || 1} required />
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
