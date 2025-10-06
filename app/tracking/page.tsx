"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Package, Send, User } from "lucide-react"
import { TrackingResults } from "@/components/tracking/tracking-results"
import { SendPackageForm } from "@/components/tracking/send-package-form"
import { LiveLocationTracker } from "@/components/tracking/live-location-tracker"

export const dynamic = "force-dynamic"

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [trackingType, setTrackingType] = useState<"passenger" | "package">("package")

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingNumber.trim()) {
      if (trackingNumber.toUpperCase().startsWith("BK-")) {
        setTrackingType("passenger")
      } else {
        setTrackingType("package")
      }
      setShowResults(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Suivi en Temps Réel</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Suivez vos colis et voyages en temps réel ou envoyez un nouveau colis
            </p>
          </div>

          <Tabs defaultValue="track" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="track" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Suivre Colis/Voyage
              </TabsTrigger>
              <TabsTrigger value="send" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Envoyer un Colis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="track" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Suivre votre colis ou voyage
                  </CardTitle>
                  <CardDescription>
                    Entrez votre numéro de suivi (ZK-XXX pour colis, BK-XXX pour billet) pour voir la position en temps
                    réel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTrack} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tracking">Numéro de suivi ou billet</Label>
                      <div className="flex gap-3">
                        <Input
                          id="tracking"
                          placeholder="Ex: ZK-2024-001 (colis) ou BK-2024-001 (billet)"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" size="lg">
                          <Search className="h-4 w-4 mr-2" />
                          Rechercher
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {showResults && (
                <>
                  <LiveLocationTracker ticketNumber={trackingNumber} type={trackingType} />
                  {trackingType === "package" && <TrackingResults trackingNumber={trackingNumber} />}
                  {trackingType === "passenger" && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Informations du Voyage
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Numéro de billet</p>
                            <p className="font-semibold">{trackingNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Passager</p>
                            <p className="font-semibold">Voir détails dans votre compte</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Siège</p>
                            <p className="font-semibold">N° 15</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Date de voyage</p>
                            <p className="font-semibold">Aujourd'hui</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="send">
              <SendPackageForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
