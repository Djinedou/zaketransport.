import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, Luggage, Clock, CreditCard } from "lucide-react"

export function RulesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Règles et Politiques</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Informations importantes pour votre voyage</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="boarding">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  Règles d'Embarquement
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed space-y-3 pt-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Arrivez au moins 30 minutes avant le départ</li>
                  <li>Présentez votre e-ticket avec code QR à l'embarquement</li>
                  <li>Une pièce d'identité valide est obligatoire</li>
                  <li>Les enfants de moins de 5 ans voyagent gratuitement (sans siège)</li>
                  <li>Les retardataires ne seront pas remboursés</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="luggage">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <Luggage className="h-5 w-5 text-primary" />
                  Politique de Bagages
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed space-y-3 pt-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>1 bagage en soute (max 20kg) inclus</li>
                  <li>1 bagage à main (max 5kg) autorisé</li>
                  <li>Supplément de 1000 FCFA par kg supplémentaire</li>
                  <li>Objets interdits: armes, produits inflammables, drogues</li>
                  <li>Zake Transport n'est pas responsable des objets de valeur non déclarés</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Modes de Paiement
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed space-y-3 pt-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>MTN Mobile Money</li>
                  <li>Moov Pay</li>
                  <li>Celtis</li>
                  <li>Paiement en espèces à nos agences</li>
                  <li>Confirmation immédiate après paiement</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="aledjo">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Service Spécial Aledjo
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed space-y-3 pt-4">
                <p className="text-muted-foreground">
                  Pour les passagers en provenance ou à destination d'Aledjo, nous offrons un service de transport
                  gratuit depuis/vers le centre-ville jusqu'à la gare routière. Veuillez nous contacter lors de votre
                  réservation pour bénéficier de ce service.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancellation">
              <AccordionTrigger className="text-lg font-semibold">Politique d'Annulation</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed space-y-3 pt-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Annulation gratuite jusqu'à 24h avant le départ</li>
                  <li>50% de remboursement entre 24h et 6h avant le départ</li>
                  <li>Aucun remboursement moins de 6h avant le départ</li>
                  <li>Report possible moyennant des frais de 2000 FCFA</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
