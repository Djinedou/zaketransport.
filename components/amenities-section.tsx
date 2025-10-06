import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

const amenities = [
  "Toilettes modernes à bord",
  "Sièges inclinables confortables",
  "Climatisation",
  "Espace pour les jambes généreux",
  "Éclairage individuel",
  "Porte-gobelets",
  "Rangement pour bagages à main",
  "Personnel accueillant",
]

export function AmenitiesSection() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Équipements de Première Classe</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nos bus neufs sont équipés de tout le nécessaire pour rendre votre voyage agréable et confortable.
              Profitez d'une expérience de transport premium.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img src="/luxury-bus-interior-with-modern-amenities-and-comf.jpg" alt="Intérieur du bus" className="w-full h-auto" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
