import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReportForm } from "@/components/report-form"

export default function ReportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-muted/30">
        <ReportForm />
      </main>
      <Footer />
    </div>
  )
}
