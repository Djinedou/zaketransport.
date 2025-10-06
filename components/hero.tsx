import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Shield, Wifi, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/70 z-10" />
        <Image src="/zake-bus.png" alt="Zake Transport Bus" fill className="object-cover opacity-20" priority />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/30">
                <Shield className="h-4 w-4" />
                Service Premium depuis 2024
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight text-white">
              Voyage en Confort et <span className="text-secondary">Sécurité</span>
            </h1>

            <p className="text-xl text-white/90 text-pretty leading-relaxed">
              Votre Confort, Notre Priorité. Découvrez l'excellence du transport inter-urbain au Bénin avec nos bus
              modernes et notre service exceptionnel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="text-base bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <Link href="/booking">
                  Réserver un Billet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              >
                <Link href="/tracking">Suivre un Colis</Link>
              </Button>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/30">
                <Phone className="h-5 w-5 text-secondary" />
                <span className="text-lg font-semibold text-white">229-01568806636</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/30">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-secondary">
                  <Clock className="h-5 w-5" />
                  <span className="text-2xl font-bold text-white">2x</span>
                </div>
                <p className="text-sm text-white/80">Départs quotidiens</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-secondary">
                  <Wifi className="h-5 w-5" />
                  <span className="text-2xl font-bold text-white">WiFi</span>
                </div>
                <p className="text-sm text-white/80">Gratuit à bord</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-secondary">
                  <Shield className="h-5 w-5" />
                  <span className="text-2xl font-bold text-white">100%</span>
                </div>
                <p className="text-sm text-white/80">Sécurisé</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 bg-white/10 backdrop-blur-sm">
              <Image
                src="/zake-bus.png"
                alt="Bus moderne Zake Transport"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border max-w-xs">
              <p className="text-sm font-medium mb-2">Prochains départs</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cotonou → Natitingou</span>
                  <span className="font-semibold">07:00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Djougou → Natitingou</span>
                  <span className="font-semibold">20:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
