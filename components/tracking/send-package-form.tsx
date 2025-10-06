"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SendPackageForm() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    from: "",
    to: "",
    description: "",
    weight: "",
    declaredValue: "",
    paymentMethod: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState("")

  const cities = ["Cotonou", "Natitingou", "Aledjo", "Djougou"]

  const calculateFee = () => {
    if (!formData.from || !formData.to) return 0
    // Simple fee calculation based on route
    if (formData.from === "Cotonou" && formData.to === "Natitingou") return 3500
    if (formData.from === "Natitingou" && formData.to === "Cotonou") return 3500
    if (formData.from === "Aledjo" && formData.to === "Natitingou") return 2000
    if (formData.from === "Natitingou" && formData.to === "Aledjo") return 2000
    if (formData.from === "Djougou" && formData.to === "Natitingou") return 1500
    if (formData.from === "Natitingou" && formData.to === "Djougou") return 1500
    return 2000
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate tracking number
    const tracking = `ZK-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`
    setTrackingNumber(tracking)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Colis enregistré avec succès!</CardTitle>
          <CardDescription className="text-center">Votre numéro de suivi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-6 bg-primary/10 rounded-full mb-4">
              <Package className="h-12 w-12 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{trackingNumber}</div>
            <p className="text-muted-foreground mb-6">Conservez ce numéro pour suivre votre colis</p>
          </div>

          <Alert>
            <AlertDescription className="text-sm leading-relaxed">
              Votre colis sera pris en charge lors du prochain départ. Vous recevrez une confirmation par SMS. Le
              destinataire sera également notifié à l'arrivée du colis.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => setSubmitted(false)}>
              Envoyer un autre colis
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <a href={`/tracking?number=${trackingNumber}`}>Suivre ce colis</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Envoyer un colis
        </CardTitle>
        <CardDescription>Remplissez les informations pour envoyer votre colis</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sender Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Informations de l'expéditeur</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="senderName">
                  Nom complet <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="senderName"
                  required
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderPhone">
                  Téléphone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="senderPhone"
                  type="tel"
                  required
                  placeholder="+229 XX XX XX XX"
                  value={formData.senderPhone}
                  onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="senderEmail">Email (optionnel)</Label>
                <Input
                  id="senderEmail"
                  type="email"
                  value={formData.senderEmail}
                  onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Informations du destinataire</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">
                  Nom complet <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="recipientName"
                  required
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientPhone">
                  Téléphone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="recipientPhone"
                  type="tel"
                  required
                  placeholder="+229 XX XX XX XX"
                  value={formData.recipientPhone}
                  onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="recipientEmail">Email (optionnel)</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  value={formData.recipientEmail}
                  onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Détails du colis</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">
                  Ville de départ <span className="text-destructive">*</span>
                </Label>
                <Select
                  required
                  value={formData.from}
                  onValueChange={(value) => setFormData({ ...formData, from: value })}
                >
                  <SelectTrigger id="from">
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">
                  Ville d'arrivée <span className="text-destructive">*</span>
                </Label>
                <Select required value={formData.to} onValueChange={(value) => setFormData({ ...formData, to: value })}>
                  <SelectTrigger id="to">
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Poids approximatif (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="declaredValue">Valeur déclarée (FCFA)</Label>
                <Input
                  id="declaredValue"
                  type="number"
                  value={formData.declaredValue}
                  onChange={(e) => setFormData({ ...formData, declaredValue: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">
                  Description du contenu <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  required
                  placeholder="Ex: Documents, vêtements, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Paiement</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">
                  Mode de paiement <span className="text-destructive">*</span>
                </Label>
                <Select
                  required
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MTN Mobile Money">MTN Mobile Money</SelectItem>
                    <SelectItem value="Moov Pay">Moov Pay</SelectItem>
                    <SelectItem value="Celtis">Celtis</SelectItem>
                    <SelectItem value="Espèces">Espèces à l'agence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Frais de livraison</Label>
                <div className="flex h-10 items-center rounded-md border bg-muted px-3">
                  <span className="text-lg font-bold">{calculateFee().toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Enregistrer le colis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
