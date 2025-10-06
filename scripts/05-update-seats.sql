-- Update schedules table to have 50 seats instead of 40
ALTER TABLE schedules ALTER COLUMN available_seats SET DEFAULT 50;

-- Update existing schedules to have 50 seats
UPDATE schedules SET available_seats = 50 WHERE available_seats = 40;

-- Add comment to clarify seat numbering
COMMENT ON COLUMN bookings.seat_number IS 'Seat number from 1 to 50';
