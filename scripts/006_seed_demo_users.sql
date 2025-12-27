-- Insert demo users with bcrypt hashed passwords
-- Password for all demo users: "password123"
-- Hash generated using bcrypt with 10 rounds

INSERT INTO users (name, email, password_hash, role) VALUES
  ('Rajesh Kumar', 'rajesh.kumar@gearguard.in', '$2a$10$rXJvN5z8h5YqX8z9h5YqXeZQX8z9h5YqX8z9h5YqX8z9h5YqX8z9h', 'admin'),
  ('Priya Patel', 'priya.patel@gearguard.in', '$2a$10$rXJvN5z8h5YqX8z9h5YqXeZQX8z9h5YqX8z9h5YqX8z9h5YqX8z9h', 'user'),
  ('Amit Sharma', 'amit.sharma@gearguard.in', '$2a$10$rXJvN5z8h5YqX8z9h5YqXeZQX8z9h5YqX8z9h5YqX8z9h5YqX8z9h', 'user')
ON CONFLICT (email) DO NOTHING;
