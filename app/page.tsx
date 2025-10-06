import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BookingSection } from "@/components/booking-section"
import { ServicesSection } from "@/components/services-section"
import { AmenitiesSection } from "@/components/amenities-section"
import { RulesSection } from "@/components/rules-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <BookingSection />
        <ServicesSection />
        <AmenitiesSection />
        <RulesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
