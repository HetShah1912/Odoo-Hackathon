-- Add recurrence fields to maintenance_requests
ALTER TABLE maintenance_requests 
ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS frequency VARCHAR(50) CHECK (frequency IN ('Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', 'None'));
