-- Update routes to reflect actual Zake Transport destinations
-- Only two main routes with PENESSOULOU as the stop for Aledjo passengers

-- Clear existing routes and stops
DELETE FROM route_stops;
DELETE FROM schedules;
DELETE FROM routes;

-- Insert correct routes
INSERT INTO routes (departure_city, arrival_city, price, duration_hours) VALUES
('Cotonou', 'Natitingou', 15000, 8.5),
('Natitingou', 'Cotonou', 15000, 8.5);

-- Insert stops for both routes (PENESSOULOU for Aledjo passengers)
INSERT INTO route_stops (route_id, stop_city, stop_order, estimated_arrival_minutes, estimated_departure_minutes, stop_duration_minutes)
SELECT id, 'Djougou', 1, 300, 315, 15 FROM routes WHERE departure_city = 'Cotonou' AND arrival_city = 'Natitingou';

INSERT INTO route_stops (route_id, stop_city, stop_order, estimated_arrival_minutes, estimated_departure_minutes, stop_duration_minutes)
SELECT id, 'Penessoulou', 2, 420, 435, 15 FROM routes WHERE departure_city = 'Cotonou' AND arrival_city = 'Natitingou';

INSERT INTO route_stops (route_id, stop_city, stop_order, estimated_arrival_minutes, estimated_departure_minutes, stop_duration_minutes)
SELECT id, 'Djougou', 1, 180, 195, 15 FROM routes WHERE departure_city = 'Natitingou' AND arrival_city = 'Cotonou';

INSERT INTO route_stops (route_id, stop_city, stop_order, estimated_arrival_minutes, estimated_departure_minutes, stop_duration_minutes)
SELECT id, 'Penessoulou', 2, 90, 105, 15 FROM routes WHERE departure_city = 'Natitingou' AND arrival_city = 'Cotonou';

-- Insert schedules for both routes (7h and 20h departures)
INSERT INTO schedules (route_id, departure_time, available_seats, bus_number)
SELECT id, '07:00:00', 50, 'ZK-001' FROM routes WHERE departure_city = 'Cotonou' AND arrival_city = 'Natitingou';

INSERT INTO schedules (route_id, departure_time, available_seats, bus_number)
SELECT id, '20:00:00', 50, 'ZK-002' FROM routes WHERE departure_city = 'Cotonou' AND arrival_city = 'Natitingou';

INSERT INTO schedules (route_id, departure_time, available_seats, bus_number)
SELECT id, '07:00:00', 50, 'ZK-003' FROM routes WHERE departure_city = 'Natitingou' AND arrival_city = 'Cotonou';

INSERT INTO schedules (route_id, departure_time, available_seats, bus_number)
SELECT id, '20:00:00', 50, 'ZK-004' FROM routes WHERE departure_city = 'Natitingou' AND arrival_city = 'Cotonou';
