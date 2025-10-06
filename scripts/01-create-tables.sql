-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create routes table
CREATE TABLE IF NOT EXISTS routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  departure_city VARCHAR(100) NOT NULL,
  arrival_city VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration_hours DECIMAL(4, 2) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  departure_time TIME NOT NULL,
  available_seats INTEGER DEFAULT 40,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
  passenger_name VARCHAR(255) NOT NULL,
  passenger_phone VARCHAR(20) NOT NULL,
  passenger_email VARCHAR(255),
  travel_date DATE NOT NULL,
  seat_number INTEGER,
  payment_method VARCHAR(50) CHECK (payment_method IN ('MTN Mobile Money', 'Moov Pay', 'Celtis')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  booking_reference VARCHAR(20) UNIQUE NOT NULL,
  qr_code TEXT,
  status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number VARCHAR(20) UNIQUE NOT NULL,
  sender_name VARCHAR(255) NOT NULL,
  sender_phone VARCHAR(20) NOT NULL,
  sender_email VARCHAR(255),
  recipient_name VARCHAR(255) NOT NULL,
  recipient_phone VARCHAR(20) NOT NULL,
  recipient_email VARCHAR(255),
  departure_city VARCHAR(100) NOT NULL,
  arrival_city VARCHAR(100) NOT NULL,
  package_description TEXT,
  weight_kg DECIMAL(10, 2),
  declared_value DECIMAL(10, 2),
  delivery_fee DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) DEFAULT 'pending',
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'arrived', 'delivered', 'cancelled')),
  current_location VARCHAR(100),
  estimated_delivery DATE,
  actual_delivery TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create staff_reports table for accountability
CREATE TABLE IF NOT EXISTS staff_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name VARCHAR(255),
  reporter_phone VARCHAR(20),
  reporter_email VARCHAR(255),
  staff_name VARCHAR(255),
  incident_type VARCHAR(100),
  incident_description TEXT NOT NULL,
  incident_date DATE,
  route VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_travel_date ON bookings(travel_date);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_packages_tracking ON packages(tracking_number);
CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);
