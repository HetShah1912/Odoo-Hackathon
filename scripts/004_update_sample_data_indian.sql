-- Update existing data with Indian names and clear for fresh Indian data
DELETE FROM maintenance_history;
DELETE FROM maintenance_requests;
DELETE FROM equipment;

-- Insert sample equipment with Indian context
INSERT INTO equipment (name, category, location, purchase_date, warranty_expiry, status, notes) VALUES
('Dell PowerEdge Server', 'IT Equipment', 'Server Room Mumbai', '2023-01-15', '2026-01-15', 'Active', 'Main production server'),
('HP LaserJet Printer', 'IT Equipment', 'Bangalore Office Floor 2', '2023-06-20', '2025-06-20', 'Active', 'Network printer for marketing team'),
('CNC Milling Machine', 'Machinery', 'Factory Floor Pune', '2022-03-10', '2027-03-10', 'Active', 'Precision machining equipment'),
('Mahindra Forklift', 'Vehicles', 'Warehouse Delhi', '2021-11-05', '2024-11-05', 'Active', 'Material handling vehicle'),
('Industrial Air Compressor', 'Machinery', 'Factory Floor Chennai', '2020-08-12', '2025-08-12', 'Active', 'Main air supply system'),
('MacBook Pro 16"', 'IT Equipment', 'IT Department Hyderabad', '2023-09-01', '2026-09-01', 'Active', 'Development workstation');

-- Insert sample maintenance requests with Indian names and INR currency
INSERT INTO maintenance_requests (equipment_id, title, description, priority, status, requester_name, assigned_to, due_date, estimated_cost) VALUES
(1, 'Server cooling system check', 'Inspect and clean cooling fans, check temperature sensors', 'High', 'New', 'Rajesh Kumar', 'Amit Sharma', CURRENT_DATE + INTERVAL '3 days', 12500.00),
(2, 'Printer toner replacement', 'Replace toner cartridge and clean print heads', 'Low', 'In Progress', 'Priya Patel', 'Sunita Reddy', CURRENT_DATE + INTERVAL '1 day', 6200.00),
(3, 'CNC machine calibration', 'Quarterly calibration and alignment check', 'Critical', 'New', 'Arjun Mehta', 'Vikram Singh', CURRENT_DATE + INTERVAL '2 days', 41500.00),
(4, 'Forklift annual inspection', 'Annual safety inspection and certification', 'High', 'Overdue', 'Neha Gupta', 'Ravi Kumar', CURRENT_DATE - INTERVAL '2 days', 24900.00),
(5, 'Air compressor filter change', 'Replace air filters and check pressure levels', 'Medium', 'In Progress', 'Deepak Verma', 'Vikram Singh', CURRENT_DATE + INTERVAL '5 days', 9950.00),
(6, 'MacBook battery service', 'Battery health check and possible replacement', 'Low', 'Completed', 'Anjali Desai', 'Sunita Reddy', CURRENT_DATE - INTERVAL '10 days', 16600.00);

-- Insert maintenance history for completed request
INSERT INTO maintenance_history (maintenance_request_id, action, notes, performed_by) VALUES
(6, 'Battery diagnostics completed', 'Battery health at 78%, recommended replacement', 'Sunita Reddy'),
(6, 'Battery replaced', 'New battery installed, health now at 100%', 'Sunita Reddy'),
(6, 'Request completed', 'MacBook returned to user, all tests passed', 'Sunita Reddy');
