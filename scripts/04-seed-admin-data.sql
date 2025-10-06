-- Insert default company policies
INSERT INTO company_policies (policy_key, policy_title, policy_content, category, display_order) VALUES
('boarding_time', 'Heure d''embarquement', 'Les passagers doivent se présenter 30 minutes avant l''heure de départ. L''embarquement commence 20 minutes avant le départ et se termine 5 minutes avant l''heure prévue.', 'boarding', 1),
('id_requirement', 'Pièce d''identité obligatoire', 'Tout passager doit présenter une pièce d''identité valide (CNI, passeport, permis de conduire) lors de l''embarquement.', 'boarding', 2),
('luggage_cabin', 'Bagages à main', 'Chaque passager a droit à un bagage à main de maximum 5 kg. Les dimensions ne doivent pas dépasser 40x30x20 cm.', 'luggage', 3),
('luggage_hold', 'Bagages en soute', 'Chaque passager a droit à 20 kg de bagages en soute. Les bagages supplémentaires sont facturés 500 FCFA par kg.', 'luggage', 4),
('prohibited_items', 'Articles interdits', 'Il est strictement interdit de transporter des armes, substances illégales, matières inflammables ou explosives, et tout objet dangereux.', 'luggage', 5),
('payment_methods', 'Modes de paiement', 'Nous acceptons MTN Mobile Money, Moov Pay et Celtis. Le paiement doit être effectué avant l''émission du billet électronique.', 'payment', 6),
('cancellation_policy', 'Politique d''annulation', 'Les annulations effectuées plus de 24h avant le départ sont remboursées à 80%. Entre 24h et 6h avant le départ: 50%. Moins de 6h: aucun remboursement.', 'cancellation', 7),
('no_show', 'Absence à l''embarquement', 'En cas d''absence à l''embarquement sans annulation préalable, aucun remboursement ne sera effectué.', 'cancellation', 8),
('children_policy', 'Politique enfants', 'Les enfants de moins de 3 ans voyagent gratuitement sans siège. De 3 à 12 ans: tarif réduit de 50%. Les mineurs non accompagnés doivent avoir une autorisation parentale.', 'general', 9),
('wifi_amenities', 'Services à bord', 'Tous nos bus sont équipés de WiFi gratuit, prises de recharge, tablettes individuelles et toilettes. Le WiFi est disponible pendant tout le trajet.', 'general', 10);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, category) VALUES
('company_name', 'ZAKE TRANSPORT', 'text', 'Nom de la compagnie', 'general'),
('company_slogan', 'Voyage en Confort et Sécurité', 'text', 'Slogan de la compagnie', 'general'),
('contact_phone', '229-01568806636', 'text', 'Numéro de téléphone principal', 'contact'),
('contact_email', 'contact@zaketransport.bj', 'text', 'Email de contact', 'contact'),
('booking_advance_days', '30', 'number', 'Nombre de jours à l''avance pour réserver', 'booking'),
('default_seats_per_bus', '40', 'number', 'Nombre de sièges par défaut par bus', 'booking'),
('package_base_fee', '2000', 'number', 'Frais de base pour l''envoi de colis (FCFA)', 'package'),
('package_fee_per_kg', '500', 'number', 'Frais par kg pour les colis (FCFA)', 'package');

-- Insert route stops for main routes
INSERT INTO route_stops (route_id, stop_city, stop_order, arrival_time_offset, departure_time_offset, stop_duration) 
SELECT id, 'Parakou', 1, 240, 255, 15 FROM routes WHERE departure_city = 'Cotonou' AND arrival_city = 'Natitingou';

INSERT INTO route_stops (route_id, stop_city, stop_order, arrival_time_offset, departure_time_offset, stop_duration)
SELECT id, 'Djougou', 2, 360, 375, 15 FROM routes WHERE departure_city = 'Cotonou' AND arrival_city = 'Natitingou';
