-- Create company_policies table for editable policies
CREATE TABLE IF NOT EXISTS company_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_key VARCHAR(100) UNIQUE NOT NULL,
  policy_title VARCHAR(255) NOT NULL,
  policy_content TEXT NOT NULL,
  category VARCHAR(50) CHECK (category IN ('boarding', 'luggage', 'payment', 'cancellation', 'general')),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  last_updated_by VARCHAR(255),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create route_stops table for intermediate stops
CREATE TABLE IF NOT EXISTS route_stops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  stop_city VARCHAR(100) NOT NULL,
  stop_order INTEGER NOT NULL,
  arrival_time_offset INTEGER, -- minutes from departure
  departure_time_offset INTEGER,
  stop_duration INTEGER DEFAULT 15, -- minutes
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create activity_logs table for monitoring all actions
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_email VARCHAR(255),
  user_role VARCHAR(20),
  action_type VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'login', 'booking', etc.
  entity_type VARCHAR(50), -- 'booking', 'package', 'route', 'policy', etc.
  entity_id VARCHAR(100),
  action_description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create system_settings table for configurable settings
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type VARCHAR(20) CHECK (setting_type IN ('text', 'number', 'boolean', 'json')),
  description TEXT,
  category VARCHAR(50),
  last_updated_by VARCHAR(255),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action_type ON activity_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_route_stops_route_id ON route_stops(route_id);
CREATE INDEX IF NOT EXISTS idx_company_policies_category ON company_policies(category);
