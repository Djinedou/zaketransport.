"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Ticket, AlertCircle, Info } from "lucide-react"
import { loginWithTicket } from "@/lib/auth"

export function TicketLoginForm() {
  const router = useRouter()
  const [ticketNumber, setTicketNumber] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await loginWithTicket(ticketNumber)

      if (result.success) {
        router.push("/account")
        router.refresh()
      } else {
        setError(result.error || "Une erreur est survenue")
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Ticket className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Accéder à ma Réservation</CardTitle>
        <CardDescription>Entrez votre numéro de billet pour voir vos détails de voyage</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="ticketNumber">Numéro de Billet</Label>
            <Input
              id="ticketNumber"
              type="text"
              required
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value.toUpperCase())}
              placeholder="BK-2024-001"
              className="font-mono text-center text-lg tracking-wider"
            />
            <p className="text-xs text-muted-foreground">
              Le numéro de billet se trouve sur votre confirmation de réservation
            </p>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Vérification..." : "Accéder à ma Réservation"}
          </Button>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Numéros de test:</strong>
              <br />
              BK-2024-001, BK-2024-002, BK-2024-003
            </AlertDescription>
          </Alert>

          <div className="text-center text-sm pt-2">
            <p className="text-muted-foreground">Pas encore de réservation?</p>
            <Button variant="link" asChild className="p-0 h-auto font-medium">
              <a href="/booking">Réserver un billet maintenant</a>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
