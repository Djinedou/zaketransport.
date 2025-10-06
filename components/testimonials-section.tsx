"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Harare",
    rating: 5,
    text: "Excellent service! The bus was clean, comfortable, and arrived on time. The staff was very professional and friendly. Highly recommend Zake Transport!",
    date: "March 2024",
  },
  {
    name: "Michael Banda",
    location: "Bulawayo",
    rating: 5,
    text: "I've been using Zake Transport for my monthly trips to Harare. Always reliable, safe, and affordable. The online booking system makes it so easy!",
    date: "February 2024",
  },
  {
    name: "Grace Moyo",
    location: "Mutare",
    rating: 5,
    text: "Best transport service in Zimbabwe! The buses are modern with great amenities. I felt safe and comfortable throughout my journey.",
    date: "March 2024",
  },
  {
    name: "David Ncube",
    location: "Gweru",
    rating: 5,
    text: "Professional drivers, punctual service, and reasonable prices. Zake Transport has become my go-to choice for intercity travel.",
    date: "January 2024",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">What Our Passengers Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with
            Zake Transport.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
