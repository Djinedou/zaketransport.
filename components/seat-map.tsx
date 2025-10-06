"use client"
import { cn } from "@/lib/utils"
import { Armchair, DoorOpen } from "lucide-react"

interface SeatMapProps {
  selectedSeat: number | null
  onSeatSelect: (seatNumber: number) => void
  bookedSeats?: number[]
}

export function SeatMap({ selectedSeat, onSeatSelect, bookedSeats = [] }: SeatMapProps) {
  // Rows 1-7: seats 1-28 (4 per row)
  // Row 8: seats 29-30, DOOR (31-32)
  // Rows 9-12: seats 33-48 (4 per row)
  // Row 13: seats 49-53 (5 seats in last row)
  const totalSeats = 53
  const doorPositions = [31, 32]

  const getSeatStatus = (seatNumber: number) => {
    if (doorPositions.includes(seatNumber)) return "door"
    if (bookedSeats.includes(seatNumber)) return "booked"
    if (selectedSeat === seatNumber) return "selected"
    return "available"
  }

  const renderSeat = (seatNumber: number) => {
    const status = getSeatStatus(seatNumber)
    const isDoor = status === "door"
    const isBooked = status === "booked"
    const isSelected = status === "selected"

    if (isDoor) {
      return (
        <div
          key={seatNumber}
          className="relative flex flex-col items-center justify-center p-2 rounded-lg border-2 border-amber-500 bg-amber-500/20"
        >
          <DoorOpen className="h-5 w-5 mb-1 text-amber-600" />
          <span className="text-xs font-semibold text-amber-600">PORTE</span>
        </div>
      )
    }

    return (
      <button
        key={seatNumber}
        type="button"
        disabled={isBooked}
        onClick={() => !isBooked && onSeatSelect(seatNumber)}
        className={cn(
          "relative flex flex-col items-center justify-center p-2 rounded-lg transition-all",
          "border-2 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100",
          {
            "border-muted bg-muted/50 text-muted-foreground": status === "available",
            "border-primary bg-primary text-primary-foreground shadow-lg scale-105": isSelected,
            "border-destructive/50 bg-destructive/10 text-destructive/50": isBooked,
          },
        )}
      >
        <Armchair className="h-5 w-5 mb-1" />
        <span className="text-xs font-semibold">{seatNumber}</span>
      </button>
    )
  }

  const renderRows = () => {
    const rows = []

    // Rows 1-7: Regular 4-seat rows (seats 1-28)
    for (let row = 1; row <= 7; row++) {
      const startSeat = (row - 1) * 4 + 1
      rows.push(
        <div key={row} className="flex items-center gap-2 mb-2">
          <div className="flex gap-2">
            {renderSeat(startSeat)}
            {renderSeat(startSeat + 1)}
          </div>
          <div className="w-8 flex items-center justify-center">
            <div className="h-px w-full bg-border" />
          </div>
          <div className="flex gap-2">
            {renderSeat(startSeat + 2)}
            {renderSeat(startSeat + 3)}
          </div>
        </div>,
      )
    }

    // Row 8: Door row (seats 29-30, DOOR 31-32)
    rows.push(
      <div key={8} className="flex items-center gap-2 mb-2">
        <div className="flex gap-2">
          {renderSeat(29)}
          {renderSeat(30)}
        </div>
        <div className="w-8 flex items-center justify-center">
          <div className="h-px w-full bg-border" />
        </div>
        <div className="flex gap-2">
          {renderSeat(31)}
          {renderSeat(32)}
        </div>
      </div>,
    )

    // Rows 9-12: Regular 4-seat rows (seats 33-48)
    for (let row = 9; row <= 12; row++) {
      const startSeat = (row - 1) * 4 + 1
      rows.push(
        <div key={row} className="flex items-center gap-2 mb-2">
          <div className="flex gap-2">
            {renderSeat(startSeat)}
            {renderSeat(startSeat + 1)}
          </div>
          <div className="w-8 flex items-center justify-center">
            <div className="h-px w-full bg-border" />
          </div>
          <div className="flex gap-2">
            {renderSeat(startSeat + 2)}
            {renderSeat(startSeat + 3)}
          </div>
        </div>,
      )
    }

    // Row 13: Last row with 5 seats (49-53) - centered
    rows.push(
      <div key={13} className="flex items-center justify-center mb-2 mt-4 px-8">
        <div className="flex gap-2">
          {renderSeat(49)}
          {renderSeat(50)}
          {renderSeat(51)}
          {renderSeat(52)}
          {renderSeat(53)}
        </div>
      </div>,
    )

    return rows
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-muted bg-muted/50 rounded" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary bg-primary rounded" />
          <span>Sélectionné</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-destructive/50 bg-destructive/10 rounded" />
          <span>Occupé</span>
        </div>
      </div>

      <div className="bg-muted/30 p-6 rounded-lg">
        <div className="mb-4 text-center">
          <div className="inline-block bg-foreground text-background px-4 py-2 rounded-t-lg text-sm font-semibold">
            CONDUCTEUR
          </div>
        </div>

        <div className="max-w-md mx-auto">{renderRows()}</div>
      </div>

      {selectedSeat && !doorPositions.includes(selectedSeat) && (
        <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary">
          <p className="font-semibold text-primary">
            Siège sélectionné: <span className="text-2xl">#{selectedSeat}</span>
          </p>
        </div>
      )}
    </div>
  )
}
