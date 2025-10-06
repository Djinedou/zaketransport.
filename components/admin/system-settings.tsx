"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save, Loader2 } from "lucide-react"
import { saveSystemSettings, getSystemSettings } from "@/lib/admin-actions"
import { toast } from "sonner"

export function SystemSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [settings, setSettings] = useState({
    companyName: "ZAKE TRANSPORT",
    companySlogan: "Voyage en Confort et Sécurité",
    contactPhone: "229-01568806636",
    contactEmail: "contact@zaketransport.bj",
    bookingAdvanceDays: "30",
    defaultSeatsPerBus: "40",
    packageBaseFee: "2000",
    packageFeePerKg: "500",
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setIsFetching(true)
    try {
      const result = await getSystemSettings()
      if (result.success && result.settings) {
        setSettings(result.settings)
      }
    } catch (error) {
      console.error("[v0] Load settings error:", error)
      toast.error("Erreur lors du chargement des paramètres")
    } finally {
      setIsFetching(false)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const result = await saveSystemSettings(settings)
      if (result.success) {
        toast.success(result.message)
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement des paramètres")
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Paramètres Système</h2>
        <p className="text-muted-foreground">Configurez les paramètres globaux de l'application</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de la compagnie</CardTitle>
            <CardDescription>Détails généraux de Zake Transport</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="companyName">Nom de la compagnie</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="companySlogan">Slogan</Label>
              <Input
                id="companySlogan"
                value={settings.companySlogan}
                onChange={(e) => setSettings({ ...settings, companySlogan: e.target.value })}
              />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="contactPhone">Téléphone de contact</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactEmail">Email de contact</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paramètres de réservation</CardTitle>
            <CardDescription>Configuration des réservations de billets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="bookingAdvanceDays">Jours de réservation à l'avance</Label>
              <Input
                id="bookingAdvanceDays"
                type="number"
                value={settings.bookingAdvanceDays}
                onChange={(e) => setSettings({ ...settings, bookingAdvanceDays: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Nombre maximum de jours à l'avance pour réserver</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="defaultSeatsPerBus">Sièges par bus</Label>
              <Input
                id="defaultSeatsPerBus"
                type="number"
                value={settings.defaultSeatsPerBus}
                onChange={(e) => setSettings({ ...settings, defaultSeatsPerBus: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Nombre de sièges par défaut dans chaque bus</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paramètres des colis</CardTitle>
            <CardDescription>Configuration de l'envoi de colis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="packageBaseFee">Frais de base (FCFA)</Label>
              <Input
                id="packageBaseFee"
                type="number"
                value={settings.packageBaseFee}
                onChange={(e) => setSettings({ ...settings, packageBaseFee: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Frais de base pour tout envoi de colis</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="packageFeePerKg">Frais par kilogramme (FCFA)</Label>
              <Input
                id="packageFeePerKg"
                type="number"
                value={settings.packageFeePerKg}
                onChange={(e) => setSettings({ ...settings, packageFeePerKg: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Frais additionnels par kg de poids</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer tous les paramètres
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
