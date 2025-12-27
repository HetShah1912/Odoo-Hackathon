-- Create equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('IT Equipment', 'Machinery', 'Vehicles')),
  location VARCHAR(255),
  purchase_date DATE,
  warranty_expiry DATE,
  status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Maintenance', 'Retired')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create maintenance_requests table
CREATE TABLE IF NOT EXISTS maintenance_requests (
  id SERIAL PRIMARY KEY,
  equipment_id INTEGER REFERENCES equipment(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(50) NOT NULL CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
  status VARCHAR(50) DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Completed', 'Overdue')),
  assigned_to VARCHAR(255),
  due_date DATE,
  completed_date DATE,
  estimated_cost DECIMAL(10, 2),
  actual_cost DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create maintenance_history table for audit trail
CREATE TABLE IF NOT EXISTS maintenance_history (
  id SERIAL PRIMARY KEY,
  maintenance_request_id INTEGER REFERENCES maintenance_requests(id) ON DELETE CASCADE,
  action VARCHAR(255) NOT NULL,
  notes TEXT,
  performed_by VARCHAR(255),
  performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment(category);
CREATE INDEX IF NOT EXISTS idx_equipment_status ON equipment(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_status ON maintenance_requests(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_priority ON maintenance_requests(priority);
CREATE INDEX IF NOT EXISTS idx_maintenance_due_date ON maintenance_requests(due_date);
