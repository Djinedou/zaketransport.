"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, MapPin, CheckCircle, Clock, Truck } from "lucide-react"

interface TrackingResultsProps {
  trackingNumber: string
}

export function TrackingResults({ trackingNumber }: TrackingResultsProps) {
  // Mock data - in production, fetch from database
  const packageData = {
    tracking: trackingNumber,
    status: "in_transit",
    sender: {
      name: "Kofi Mensah",
      phone: "+229 97 XX XX XX",
      city: "Cotonou",
    },
    recipient: {
      name: "Ama Yeboah",
      phone: "+229 96 XX XX XX",
      city: "Natitingou",
    },
    currentLocation: "Djougou",
    estimatedDelivery: "2024-01-16",
    fee: 3500,
    weight: "5 kg",
    description: "Documents et vêtements",
    timeline: [
      {
        status: "Colis enregistré",
        location: "Cotonou",
        date: "2024-01-15",
        time: "09:30",
        completed: true,
      },
      {
        status: "En transit",
        location: "Djougou",
        date: "2024-01-15",
        time: "15:45",
        completed: true,
      },
      {
        status: "En cours de livraison",
        location: "Natitingou",
        date: "2024-01-16",
        time: "08:00",
        completed: false,
      },
      {
        status: "Livré",
        location: "Natitingou",
        date: "2024-01-16",
        time: "À confirmer",
        completed: false,
      },
    ],
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; variant: "default" | "secondary"; icon: any }> = {
      pending: { label: "En attente", variant: "secondary", icon: Clock },
      in_transit: { label: "En transit", variant: "default", icon: Truck },
      delivered: { label: "Livré", variant: "default", icon: CheckCircle },
    }
    return configs[status] || configs.pending
  }

  const statusConfig = getStatusConfig(packageData.status)
  const StatusIcon = statusConfig.icon

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Suivi du colis</CardTitle>
              <CardDescription className="text-base mt-2">Numéro: {packageData.tracking}</CardDescription>
            </div>
            <Badge variant={statusConfig.variant} className="text-sm px-3 py-1">
              <StatusIcon className="h-4 w-4 mr-2" />
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Expéditeur
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{packageData.sender.name}</p>
                  <p className="text-muted-foreground">{packageData.sender.phone}</p>
                  <p className="text-muted-foreground">{packageData.sender.city}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Destinataire
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{packageData.recipient.name}</p>
                  <p className="text-muted-foreground">{packageData.recipient.phone}</p>
                  <p className="text-muted-foreground">{packageData.recipient.city}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Position actuelle</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{packageData.currentLocation}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Livraison estimée</span>
                  <span className="font-semibold">{packageData.estimatedDelivery}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Poids</span>
                  <span className="font-semibold">{packageData.weight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Frais de livraison</span>
                  <span className="font-semibold">{packageData.fee.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Historique du colis</h3>
            <div className="space-y-4">
              {packageData.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        event.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {event.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </div>
                    {index < packageData.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${event.completed ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className={`font-medium ${event.completed ? "text-foreground" : "text-muted-foreground"}`}>
                      {event.status}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.location} • {event.date} à {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
