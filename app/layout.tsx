import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { UpdatePrompt } from "@/components/update-prompt"
import "./globals.css"

export const metadata: Metadata = {
  title: "Zake Transport - Votre Confort, Notre Priorité",
  description:
    "Service de transport inter-urbain premium au Bénin. Voyagez confortablement entre Cotonou, Natitingou, Aledjo et Djougou.",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Zake Transport",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#0EA5E9",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="apple-touch-icon" href="/zake-logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then((registration) => {
                    // Check for updates on page load
                    registration.update()
                  })
                })
              }
            `,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <UpdatePrompt />
        <Analytics />
      </body>
    </html>
  )
}
