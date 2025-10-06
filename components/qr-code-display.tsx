"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, QrCodeIcon } from "lucide-react"

interface QRCodeDisplayProps {
  data: string
  size?: number
  className?: string
  showDownload?: boolean
}

export function QRCodeDisplay({ data, size = 200, className = "", showDownload = true }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) return

      try {
        // Dynamic import of qrcode library
        const QRCode = (await import("qrcode")).default

        await QRCode.toCanvas(canvasRef.current, data, {
          width: size,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
          errorCorrectionLevel: "H",
        })
        setError(null)
      } catch (err) {
        console.error("[v0] QR Code generation error:", err)
        setError("Erreur lors de la génération du code QR")
      }
    }

    generateQRCode()
  }, [data, size])

  const handleDownload = () => {
    if (!canvasRef.current) return

    const url = canvasRef.current.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = `qr-code-${data}.png`
    link.href = url
    link.click()
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 bg-muted rounded-lg ${className}`}>
        <QrCodeIcon className="h-12 w-12 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <Card className="p-4 bg-white">
        <canvas ref={canvasRef} className="block" />
      </Card>
      {showDownload && (
        <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Télécharger le QR Code
        </Button>
      )}
    </div>
  )
}
