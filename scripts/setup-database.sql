-- Drop existing tables if they exist
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS stops CASCADE;
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;
DROP TABLE IF EXISTS policies CASCADE;

-- Create routes table
CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create stops table
CREATE TABLE stops (
  id SERIAL PRIMARY KEY,
  route_id INTEGER REFERENCES routes(id) ON DELETE CASCADE,
  stop_name VARCHAR(100) NOT NULL,
  stop_order INTEGER NOT NULL,
  arrival_time VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  passenger_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  route_id INTEGER REFERENCES routes(id),
  travel_date DATE NOT NULL,
  departure_time VARCHAR(20) NOT NULL,
  seat_number INTEGER NOT NULL,
  breakfast_choice VARCHAR(100),
  status VARCHAR(20) DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create packages table
CREATE TABLE packages (
  id SERIAL PRIMARY KEY,
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  sender_name VARCHAR(100) NOT NULL,
  sender_phone VARCHAR(20) NOT NULL,
  recipient_name VARCHAR(100) NOT NULL,
  recipient_phone VARCHAR(20) NOT NULL,
  route_id INTEGER REFERENCES routes(id),
  package_description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reports table
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  reporter_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  report_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create system_settings table
CREATE TABLE system_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create policies table
CREATE TABLE policies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial routes
INSERT INTO routes (origin, destination, price, duration) VALUES
('Cotonou', 'Djougou', 6000.00, '6h'),
('Cotonou', 'Natitingou', 7000.00, '8h'),
('Natitingou', 'Cotonou', 7000.00, '8h'),
('Djougou', 'Cotonou', 6000.00, '6h'),
('Cotonou', 'Aledjo', 6000.00, '6h'),
-- Insert stops for routes
INSERT INTO stops (route_id, stop_name, stop_order, arrival_time) VALUES
(2, 'Djougou', 1, '10:00'),
(2, 'Penessoulou (Aledjo)', 2, '11:30'),
(3, 'Penessoulou (Aledjo)', 1, '10:30'),
(3, 'Djougou', 2, '12:00');

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value) VALUES
('company_name', 'ZAKE TRANSPORT'),
('tagline', 'Votre confort notre Priorité'),
('contact_phone', '+229 XX XX XX XX'),
('contact_email', 'contact@zaketransport.com');

-- Insert default policies
INSERT INTO policies (title, content, category, is_active) VALUES
('Politique de Bagages', 'Chaque passager a droit à 20kg de bagages gratuits. Les bagages supplémentaires sont facturés.', 'bagages', true),
('Politique d''Annulation', 'Les annulations doivent être faites 24h avant le départ pour un remboursement complet.', 'annulation', true),
('Politique de Retard', 'En cas de retard de plus de 2 heures, les passagers seront remboursés à 50%.', 'retard', true);
