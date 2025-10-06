"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  { id: "1", from: "Cotonou", to: "Natitingou", price: 15000, duration: "8h30" },
  { id: "2", from: "Natitingou", to: "Cotonou", price: 15000, duration: "8h30" },
  { id: "3", from: "Aledjo", to: "Natitingou", price: 8000, duration: "4h00" },
  { id: "4", from: "Natitingou", to: "Aledjo", price: 8000, duration: "4h00" },
  { id: "5", from: "Djougou", to: "Natitingou", price: 5000, duration: "2h30" },
  { id: "6", from: "Natitingou", to: "Djougou", price: 5000, duration: "2h30" },
]

const departureTimes = ["07:00", "20:00"]

const formatDate = (date: Date, format: "iso" | "long") => {
  if (format === "iso") {
    return date.toISOString().split("T")[0]
  }
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function BookingSection() {
  const [date, setDate] = useState<Date>()
  const [selectedRoute, setSelectedRoute] = useState<string>()
  const [selectedTime, setSelectedTime] = useState<string>()

  const handleBooking = () => {
    if (!selectedRoute || !date || !selectedTime) {
      alert("Veuillez remplir tous les champs")
      return
    }
    window.location.href = `/booking?route=${selectedRoute}&date=${formatDate(date, "iso")}&time=${selectedTime}`
  }

  const selectedRouteData = routes.find((r) => r.id === selectedRoute)

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Réservez Votre Voyage</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez votre itinéraire et réservez votre place en quelques clics
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Nouvelle Réservation</CardTitle>
            <CardDescription>Départs quotidiens à 7h00 et 20h00</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="route">Itinéraire</Label>
                <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                  <SelectTrigger id="route">
                    <SelectValue placeholder="Sélectionnez un itinéraire" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route.id} value={route.id}>
                        {route.from} → {route.to} ({route.price.toLocaleString()} FCFA)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date de voyage</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? formatDate(date, "long") : "Choisir une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Heure de départ</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Sélectionnez l'heure" />
                  </SelectTrigger>
                  <SelectContent>
                    {departureTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Informations</Label>
                <div className="p-4 bg-muted rounded-lg space-y-1">
                  {selectedRouteData ? (
                    <>
                      <p className="text-sm font-medium">Prix: {selectedRouteData.price.toLocaleString()} FCFA</p>
                      <p className="text-sm text-muted-foreground">Durée: {selectedRouteData.duration}</p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Sélectionnez un itinéraire</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-6"
              size="lg"
              onClick={handleBooking}
              disabled={!selectedRoute || !date || !selectedTime}
            >
              Continuer la Réservation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
