"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Ticket, Shield } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export function Header() {
  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Réserver", href: "/booking" },
    { name: "Suivre un Colis", href: "/tracking" },
    { name: "Signaler", href: "/report" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image src="/zake-logo.png" alt="Zake Transport" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">ZAKE TRANSPORT</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Votre Confort, Notre Priorité</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild>
              <Link href="/auth/login">
                <Ticket className="h-4 w-4 mr-2" />
                Accéder à ma Réservation
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" title="Administration">
              <Link href="/admin">
                <Shield className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t pt-4 mt-4 space-y-3">
                  <Button asChild className="w-full">
                    <Link href="/auth/login">
                      <Ticket className="h-4 w-4 mr-2" />
                      Accéder à ma Réservation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/admin">
                      <Shield className="h-4 w-4 mr-2" />
                      Administration
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
