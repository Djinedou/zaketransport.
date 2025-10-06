-- Insert default admin user (password: zake2024 - should be hashed in production)
INSERT INTO users (email, password_hash, full_name, role) VALUES
('admin@zaketransport.com', '$2a$10$YourHashedPasswordHere', 'Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert routes
INSERT INTO routes (departure_city, arrival_city, price, duration_hours) VALUES
('Cotonou', 'Natitingou', 15000, 8.5),
('Natitingou', 'Cotonou', 15000, 8.5),
('Aledjo', 'Natitingou', 8000, 4.0),
('Natitingou', 'Aledjo', 8000, 4.0),
('Djougou', 'Natitingou', 5000, 2.5),
('Natitingou', 'Djougou', 5000, 2.5)
ON CONFLICT DO NOTHING;

-- Insert schedules (7h and 20h departures)
INSERT INTO schedules (route_id, departure_time, available_seats)
SELECT id, '07:00:00', 40 FROM routes
UNION ALL
SELECT id, '20:00:00', 40 FROM routes
ON CONFLICT DO NOTHING;
