-- Add requester_name column to maintenance_requests table
ALTER TABLE maintenance_requests 
ADD COLUMN IF NOT EXISTS requester_name VARCHAR(255);
