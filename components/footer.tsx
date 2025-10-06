import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/zake-logo.png"
                alt="Zake Transport Logo"
                width={60}
                height={60}
                className="object-contain brightness-0 invert"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold">ZAKE TRANSPORT</span>
                <span className="text-xs opacity-90">Votre Confort, Notre Priorité</span>
              </div>
            </div>
            {/* </CHANGE> */}
            <p className="text-sm opacity-90 leading-relaxed">
              Service de transport inter-urbain premium au Bénin. Voyagez confortablement et en toute sécurité.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="opacity-90 hover:opacity-100 transition-opacity">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/booking" className="opacity-90 hover:opacity-100 transition-opacity">
                  Réserver
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="opacity-90 hover:opacity-100 transition-opacity">
                  Suivre un Colis
                </Link>
              </li>
              <li>
                <Link href="/report" className="opacity-90 hover:opacity-100 transition-opacity">
                  Signaler un Incident
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Nos Destinations</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Cotonou</li>
              <li>Natitingou</li>
              <li>Aledjo</li>
              <li>Djougou</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="opacity-90">229-01568806636</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="opacity-90">contact@zaketransport.bj</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="opacity-90">Cotonou, Bénin</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm opacity-90">
            <p>&copy; {new Date().getFullYear()} Zake Transport. Tous droits réservés.</p>
            <Link
              href="/admin"
              className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity group"
            >
              <Image
                src="/zake-logo.png"
                alt="Zake Transport Logo"
                width={120}
                height={60}
                className="object-contain brightness-0 invert group-hover:scale-105 transition-transform"
              />
              <span className="text-xs font-medium">Tableau de bord administrateur</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
