import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bus, Package, Shield, Clock, Wifi, Smartphone } from "lucide-react"

const services = [
  {
    icon: Bus,
    title: "Bus Modernes",
    description: "Flotte de bus neufs équipés des dernières technologies pour votre confort",
  },
  {
    icon: Wifi,
    title: "WiFi Gratuit",
    description: "Restez connecté pendant tout votre voyage avec notre WiFi haut débit",
  },
  {
    icon: Smartphone,
    title: "Tablettes & Prises",
    description: "Chaque siège dispose d'une prise de charge et d'une tablette",
  },
  {
    icon: Shield,
    title: "Voyage Sécurisé",
    description: "Chauffeurs expérimentés et bus entretenus régulièrement",
  },
  {
    icon: Clock,
    title: "Ponctualité",
    description: "Départs à l'heure garantis - 7h00 et 20h00 tous les jours",
  },
  {
    icon: Package,
    title: "Envoi de Colis",
    description: "Service de livraison de colis avec suivi en temps réel",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une expérience de voyage premium avec tous les équipements modernes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
