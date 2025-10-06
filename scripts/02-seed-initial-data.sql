-- Insert initial routes
INSERT INTO routes (origin, destination, price, duration) VALUES
('Cotonou', 'Djougou', 6000.00, '4h'),
('Cotonou', 'Natitingou', 7000.00, '6h'),
('Natitingou', 'Cotonou', 7000.00, '6h'),
('Natitingou', 'Djougou', 2000.00, '2h'),
('Djougou', 'Cotonou', 6000.00, '4h'),
('Djougou', 'Natitingou', 2000.00, '2h'),
('Cotonou', 'Aledjo', 6000.00, '5h'),
('Aledjo', 'Cotonou', 6000.00, '5h'),
('Aledjo', 'Natitingou', 2000.00, '1h'),
('Natitingou', 'Aledjo', 2000.00, '1h');

-- Insert stops for routes
INSERT INTO stops (route_id, stop_name, stop_order) VALUES
(2, 'Djougou', 1),
(2, 'Penessoulou', 2),
(3, 'Penessoulou', 1),
(3, 'Djougou', 2);

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value) VALUES
('company_name', 'ZAKE TRANSPORT'),
('tagline', 'Voyage en Confort et Sécurité'),
('contact_phone', '+229 XX XX XX XX'),
('contact_email', 'contact@zaketransport.com'),
('admin_password', 'admin123');

-- Insert initial policies
INSERT INTO policies (title, content, category) VALUES
('Politique de Bagages', 'Chaque passager a droit à 20kg de bagages gratuits. Les bagages supplémentaires sont facturés 500 CFA par kg.', 'bagages'),
('Politique d''Annulation', 'Les annulations doivent être faites 24h avant le départ pour un remboursement complet.', 'annulation'),
('Règles de Sécurité', 'Le port de la ceinture de sécurité est obligatoire. Il est interdit de fumer dans le bus.', 'securite');
