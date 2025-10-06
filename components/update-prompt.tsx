"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // Check for updates every 5 minutes
        setInterval(
          () => {
            registration.update()
          },
          5 * 60 * 1000,
        )

        // Listen for new service worker
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                setShowPrompt(true)
              }
            })
          }
        })
      })
    }
  }, [])

  const handleUpdate = () => {
    window.location.reload()
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
      <div className="rounded-lg border bg-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-5 w-5 text-blue-600" />
          <div className="flex-1">
            <p className="font-semibold text-sm">Nouvelle version disponible</p>
            <p className="text-xs text-gray-600">Cliquez pour mettre à jour</p>
          </div>
          <Button onClick={handleUpdate} size="sm" className="bg-blue-600 hover:bg-blue-700">
            Mettre à jour
          </Button>
        </div>
      </div>
    </div>
  )
}
