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
import { Search, Package, Send } from "lucide-react"
import { TrackingResults } from "@/components/tracking/tracking-results"
import { SendPackageForm } from "@/components/tracking/send-package-form"

export const dynamic = "force-dynamic"

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingNumber.trim()) {
      setShowResults(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Service de Colis</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Suivez vos colis en temps réel ou envoyez un nouveau colis
            </p>
          </div>

          <Tabs defaultValue="track" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="track" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Suivre un Colis
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
                    Suivre votre colis
                  </CardTitle>
                  <CardDescription>Entrez votre numéro de suivi pour voir l'état de votre colis</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTrack} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tracking">Numéro de suivi</Label>
                      <div className="flex gap-3">
                        <Input
                          id="tracking"
                          placeholder="Ex: ZK-2024-001"
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

              {showResults && <TrackingResults trackingNumber={trackingNumber} />}
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
