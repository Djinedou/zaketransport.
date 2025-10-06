"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SeatMap } from "@/components/seat-map"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Ticket, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QRCodeDisplay } from "@/components/qr-code-display"

export const dynamic = "force-dynamic"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1) // Added step state for multi-step booking
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null) // Added seat selection state
  const [bookedSeats, setBookedSeats] = useState<number[]>([]) // Mock booked seats

  const [formData, setFormData] = useState({
    passengerName: "",
    passengerPhone: "",
    route: searchParams.get("route") || "",
    date: searchParams.get("date") || "",
    time: searchParams.get("time") || "",
    paymentMethod: "",
    acceptTerms: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [bookingReference, setBookingReference] = useState("")

  useEffect(() => {
    const mockBookedSeats = [5, 12, 18, 23, 27, 34, 41, 45]
    setBookedSeats(mockBookedSeats)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedSeat) {
      alert("Veuillez sélectionner un siège")
      return
    }

    const reference = `BK-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`
    setBookingReference(reference)
    setSubmitted(true)
  }

  if (submitted) {
    const qrCodeData = JSON.stringify({
      ticketNumber: bookingReference,
      passengerName: formData.passengerName,
      route: formData.route,
      date: formData.date,
      time: formData.time,
      seat: selectedSeat,
      phone: formData.passengerPhone,
    })

    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12 md:py-20 bg-muted/30 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Ticket className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Réservation confirmée!</CardTitle>
                <CardDescription className="text-center">Votre référence de réservation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{bookingReference}</div>
                  <p className="text-lg font-semibold text-primary mb-2">Siège N° {selectedSeat}</p>
                  <p className="text-muted-foreground mb-6">Votre e-ticket avec code QR a été envoyé par SMS</p>
                </div>

                <div className="flex justify-center">
                  <QRCodeDisplay data={qrCodeData} size={200} showDownload={true} />
                </div>

                <Alert>
                  <AlertDescription className="text-sm leading-relaxed">
                    <strong>Important:</strong> Présentez-vous à la gare 30 minutes avant le départ avec votre pièce
                    d'identité et votre e-ticket. Bon voyage!
                  </AlertDescription>
                </Alert>

                <Button className="w-full" onClick={() => setSubmitted(false)}>
                  Faire une nouvelle réservation
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Réserver un Billet</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sélectionnez votre siège et complétez vos informations
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full",
                  step === 1 ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                <span className="font-semibold">1</span>
                <span className="text-sm">Choisir un siège</span>
              </div>
              <div className="w-8 h-px bg-border" />
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full",
                  step === 2 ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                <span className="font-semibold">2</span>
                <span className="text-sm">Informations</span>
              </div>
            </div>

            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Sélectionnez votre siège</CardTitle>
                  <CardDescription>Choisissez parmi les 50 sièges disponibles</CardDescription>
                </CardHeader>
                <CardContent>
                  <SeatMap selectedSeat={selectedSeat} onSeatSelect={setSelectedSeat} bookedSeats={bookedSeats} />
                  <Button className="w-full mt-6" size="lg" onClick={() => setStep(2)} disabled={!selectedSeat}>
                    Continuer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations de réservation</CardTitle>
                  <CardDescription>
                    Siège sélectionné: <span className="font-semibold text-primary">N° {selectedSeat}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Informations du passager</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="passengerName">
                            Nom complet <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="passengerName"
                            required
                            value={formData.passengerName}
                            onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passengerPhone">
                            Téléphone <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="passengerPhone"
                            type="tel"
                            required
                            placeholder="+229 XX XX XX XX"
                            value={formData.passengerPhone}
                            onChange={(e) => setFormData({ ...formData, passengerPhone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Détails du voyage</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="route">
                            Itinéraire <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            required
                            value={formData.route}
                            onValueChange={(value) => setFormData({ ...formData, route: value })}
                          >
                            <SelectTrigger id="route">
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cotonou → Natitingou">Cotonou → Natitingou (15,000 FCFA)</SelectItem>
                              <SelectItem value="Natitingou → Cotonou">Natitingou → Cotonou (15,000 FCFA)</SelectItem>
                              <SelectItem value="Aledjo → Natitingou">Aledjo → Natitingou (8,000 FCFA)</SelectItem>
                              <SelectItem value="Natitingou → Aledjo">Natitingou → Aledjo (8,000 FCFA)</SelectItem>
                              <SelectItem value="Djougou → Natitingou">Djougou → Natitingou (5,000 FCFA)</SelectItem>
                              <SelectItem value="Natitingou → Djougou">Natitingou → Djougou (5,000 FCFA)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date">
                            Date de voyage <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">
                            Heure de départ <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            required
                            value={formData.time}
                            onValueChange={(value) => setFormData({ ...formData, time: value })}
                          >
                            <SelectTrigger id="time">
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="07:00">07:00</SelectItem>
                              <SelectItem value="20:00">20:00</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
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
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        J'accepte les conditions générales et la politique d'annulation de Zake Transport
                      </Label>
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} className="w-full">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Retour
                      </Button>
                      <Button type="submit" size="lg" className="w-full" disabled={!formData.acceptTerms}>
                        Confirmer la réservation
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
