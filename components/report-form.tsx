"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ReportForm() {
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterPhone: "",
    reporterEmail: "",
    staffName: "",
    incidentType: "",
    route: "",
    incidentDate: "",
    description: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Signalement enregistré</CardTitle>
            <CardDescription className="text-center">
              Merci pour votre retour. Nous prenons tous les signalements au sérieux.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription className="text-sm leading-relaxed">
                Votre signalement a été transmis à notre équipe administrative. Nous examinerons cette situation dans
                les plus brefs délais et prendrons les mesures appropriées. Vous serez contacté si nous avons besoin
                d'informations supplémentaires.
              </AlertDescription>
            </Alert>
            <Button className="w-full" onClick={() => setSubmitted(false)}>
              Faire un autre signalement
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Signaler un Incident</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Votre satisfaction est notre priorité. Signalez tout comportement inapproprié de notre personnel.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Formulaire de signalement
          </CardTitle>
          <CardDescription>
            Toutes les informations sont confidentielles. Vous pouvez rester anonyme si vous le souhaitez.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reporter Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Vos informations (optionnel)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reporterName">Nom complet</Label>
                  <Input
                    id="reporterName"
                    placeholder="Anonyme"
                    value={formData.reporterName}
                    onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reporterPhone">Téléphone</Label>
                  <Input
                    id="reporterPhone"
                    type="tel"
                    placeholder="+229 XX XX XX XX"
                    value={formData.reporterPhone}
                    onChange={(e) => setFormData({ ...formData, reporterPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="reporterEmail">Email</Label>
                  <Input
                    id="reporterEmail"
                    type="email"
                    value={formData.reporterEmail}
                    onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Incident Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Détails de l'incident</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="staffName">
                    Nom du personnel concerné <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="staffName"
                    required
                    placeholder="Ex: Chauffeur Koffi"
                    value={formData.staffName}
                    onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incidentType">
                    Type d'incident <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    required
                    value={formData.incidentType}
                    onValueChange={(value) => setFormData({ ...formData, incidentType: value })}
                  >
                    <SelectTrigger id="incidentType">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Retard">Retard</SelectItem>
                      <SelectItem value="Service client">Service client</SelectItem>
                      <SelectItem value="Conduite dangereuse">Conduite dangereuse</SelectItem>
                      <SelectItem value="Propreté">Propreté</SelectItem>
                      <SelectItem value="Harcèlement">Harcèlement</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route">Itinéraire</Label>
                  <Select value={formData.route} onValueChange={(value) => setFormData({ ...formData, route: value })}>
                    <SelectTrigger id="route">
                      <SelectValue placeholder="Sélectionnez" />
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
                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Date de l'incident</Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">
                    Description de l'incident <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    required
                    placeholder="Décrivez ce qui s'est passé en détail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                  />
                </div>
              </div>
            </div>

            <Alert>
              <AlertDescription className="text-sm leading-relaxed">
                Nous prenons tous les signalements au sérieux et enquêterons sur chaque cas. Les informations fournies
                resteront confidentielles.
              </AlertDescription>
            </Alert>

            <Button type="submit" size="lg" className="w-full">
              Envoyer le signalement
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
