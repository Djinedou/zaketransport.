import { Alert } from "@/components/ui/alert"
import { redirect } from "next/navigation"
import { getCurrentBooking, logout } from "@/lib/auth"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, Ticket, MapPin, Calendar, Clock, User, Coffee } from "lucide-react"
import { QRCodeDisplay } from "@/components/qr-code-display"

export default async function AccountPage() {
  const booking = await getCurrentBooking()

  if (!booking) {
    redirect("/auth/login")
  }

  // Mock additional booking details - in production, fetch from database
  const bookingDetails = {
    ...booking,
    seatNumber: "A12",
    price: 15000,
    status: "confirmed",
    departurePoint: "Gare Routière de Cotonou",
    arrivalPoint: "Gare de Natitingou",
    breakfast: "Café au lait avec sandwich",
    qrCode: booking.ticketNumber,
  }

  async function handleLogout() {
    "use server"
    await logout()
    redirect("/")
  }

  const qrCodeData = JSON.stringify({
    ticketNumber: bookingDetails.ticketNumber,
    passengerName: bookingDetails.passengerName,
    route: bookingDetails.route,
    date: bookingDetails.date,
    time: bookingDetails.time,
    seat: bookingDetails.seatNumber,
    breakfast: bookingDetails.breakfast,
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Ma Réservation</h1>
            <p className="text-muted-foreground">Détails de votre voyage avec Zake Transport</p>
          </div>

          <div className="grid gap-6">
            {/* Ticket Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="bg-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Ticket className="h-6 w-6" />
                      Billet de Voyage
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      Numéro: <span className="font-mono font-bold">{bookingDetails.ticketNumber}</span>
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="text-base px-4 py-2">
                    Confirmé
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Passenger Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Passager</p>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium text-lg">{bookingDetails.passengerName}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Siège</p>
                      <p className="font-bold text-2xl text-primary">{bookingDetails.seatNumber}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Prix</p>
                      <p className="font-bold text-xl">{bookingDetails.price.toLocaleString()} FCFA</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Petit-déjeuner</p>
                      <div className="flex items-center gap-2">
                        <Coffee className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{bookingDetails.breakfast}</p>
                      </div>
                    </div>
                  </div>

                  {/* Journey Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Itinéraire</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium text-lg">{bookingDetails.route}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date de Départ</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{bookingDetails.date}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Heure de Départ</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{bookingDetails.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Code QR pour l'embarquement</p>
                      <p className="text-xs text-muted-foreground">Présentez ce code à la gare</p>
                    </div>
                    <QRCodeDisplay data={qrCodeData} size={150} showDownload={true} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Departure Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de Départ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Point de Départ</p>
                  <p className="font-medium">{bookingDetails.departurePoint}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Point d'Arrivée</p>
                  <p className="font-medium">{bookingDetails.arrivalPoint}</p>
                </div>
                <Alert>
                  <h2 className="text-sm">Attention</h2>
                  <p className="text-sm text-muted-foreground">
                    Veuillez arriver <strong>30 minutes avant</strong> l'heure de départ pour l'enregistrement.
                  </p>
                </Alert>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" asChild>
                <a href="/booking">Nouvelle Réservation</a>
              </Button>
              <form action={handleLogout} className="flex-1">
                <Button type="submit" variant="outline" className="w-full bg-transparent">
                  <LogOut className="h-4 w-4 mr-2" />
                  Se Déconnecter
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
