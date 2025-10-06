"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, CheckCircle, Circle } from "lucide-react"
import { useEffect, useState } from "react"

interface LiveLocationTrackerProps {
  ticketNumber: string
  type: "passenger" | "package"
}

export function LiveLocationTracker({ ticketNumber, type }: LiveLocationTrackerProps) {
  const [currentProgress, setCurrentProgress] = useState(0)

  const journeyData = {
    passenger: {
      route: "Cotonou → Natitingou",
      departure: "07:00",
      arrival: "15:30",
      currentLocation: "Djougou",
      progress: 60,
      stops: [
        { name: "Cotonou", time: "07:00", status: "completed", distance: "0 km" },
        { name: "Djougou", time: "12:00", status: "current", distance: "420 km" },
        { name: "Penessoulou (Aledjo)", time: "14:00", status: "pending", distance: "540 km" },
        { name: "Natitingou", time: "15:30", status: "pending", distance: "650 km" },
      ],
      estimatedArrival: "15:45",
      speed: "85 km/h",
      nextStop: "Penessoulou",
      distanceRemaining: "230 km",
    },
    package: {
      route: "Cotonou → Natitingou",
      departure: "09:30",
      arrival: "18:00",
      currentLocation: "Djougou",
      progress: 45,
      stops: [
        { name: "Cotonou - Dépôt", time: "09:30", status: "completed", distance: "0 km" },
        { name: "Djougou - Transit", time: "14:30", status: "current", distance: "420 km" },
        { name: "Penessoulou - Arrêt", time: "16:30", status: "pending", distance: "540 km" },
        { name: "Natitingou - Livraison", time: "18:00", status: "pending", distance: "650 km" },
      ],
      estimatedArrival: "18:30",
      nextStop: "Penessoulou",
      distanceRemaining: "230 km",
    },
  }

  const data = type === "passenger" ? journeyData.passenger : journeyData.package

  // Simulate real-time progress updates
  useEffect(() => {
    setCurrentProgress(data.progress)
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 0.5 // Simulate movement
      })
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [data.progress])

  const getStopIcon = (status: string) => {
    if (status === "completed") return <CheckCircle className="h-5 w-5 text-green-500" />
    if (status === "current") return <Navigation className="h-5 w-5 text-primary animate-pulse" />
    return <Circle className="h-5 w-5 text-muted-foreground" />
  }

  return (
    <div className="space-y-6">
      {/* Live Status Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Position en Temps Réel
            </CardTitle>
            <Badge variant="default" className="animate-pulse">
              En Direct
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Location */}
          <div className="p-4 bg-background rounded-lg border-2 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Localisation actuelle</p>
                <p className="text-2xl font-bold text-primary">{data.currentLocation}</p>
              </div>
              <Navigation className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Prochain arrêt</p>
                <p className="font-semibold">{data.nextStop}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Distance restante</p>
                <p className="font-semibold">{data.distanceRemaining}</p>
              </div>
              {type === "passenger" && (
                <div>
                  <p className="text-muted-foreground">Vitesse actuelle</p>
                  <p className="font-semibold">{data.speed}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Arrivée estimée</p>
                <p className="font-semibold flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {data.estimatedArrival}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progression du trajet</span>
              <span className="font-semibold">{Math.round(currentProgress)}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000 ease-linear"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>

          {/* Route Visualization */}
          <div className="space-y-1">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Itinéraire et Arrêts
            </h3>
            <div className="space-y-3">
              {data.stops.map((stop, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    {getStopIcon(stop.status)}
                    {index < data.stops.length - 1 && (
                      <div className={`w-0.5 h-12 ${stop.status === "completed" ? "bg-green-500" : "bg-muted"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <p
                        className={`font-medium ${
                          stop.status === "current"
                            ? "text-primary font-bold"
                            : stop.status === "completed"
                              ? "text-foreground"
                              : "text-muted-foreground"
                        }`}
                      >
                        {stop.name}
                      </p>
                      {stop.status === "current" && (
                        <Badge variant="default" className="text-xs">
                          Ici maintenant
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {stop.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {stop.distance}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Updates */}
          <div className="p-3 bg-muted/50 rounded-lg border border-muted">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Dernière mise à jour: Il y a 2 minutes • Mise à jour automatique toutes les 5 minutes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
