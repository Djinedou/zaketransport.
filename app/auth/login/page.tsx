import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TicketLoginForm } from "@/components/ticket-login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-muted/30 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <TicketLoginForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
